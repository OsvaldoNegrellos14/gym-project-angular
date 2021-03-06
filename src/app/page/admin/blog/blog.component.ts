import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));

  currentId;
  file;
  preview;
  currentImg;
  existImg = false;
  news: any;

  newsForm = this.form.group({
    content: '',
    date: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    title: ''
  });

  editNewsForm = this.form.group({
    content: '',
    date: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    title: ''
  });
  constructor(
    private adminService: AdminService,
    private form: FormBuilder,
    private fStorage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.adminService.getGyms()
      .subscribe((gyms: any) => {
        const gym = gyms.find(gym => gym.uid == this.user.uid)
        this.news = Object.values(gym.news);
        // console.log(this.news)
        this.spinner.hide();
      });
  }

  async submitNews() {
    this.spinner.show();
    const fileId = new Date().getTime();
    const date = new Date().toLocaleDateString();

    await this.adminService.uploadImg(this.file, '/images/gyms/' + this.user.uid + '/news/' + fileId + '/' + 'IMG_' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.newsForm.value.date = date;
      this.newsForm.value.id = fileId;
      this.newsForm.value.img.id = fileId;
      this.newsForm.value.img.url = fileUrl;
      // console.log(this.editNewsForm.value);
      this.adminService.setNews(this.newsForm.value, fileId);
      this.existImg = false;
      this.preview = null;
      this.resetForm();
    });
    this.spinner.hide();

  }

  async submitEditedNews() {
    this.spinner.show();
    if (this.file) {
      // console.log('new img', this.file);
      // console.log(this.currentId);
      await this.adminService
        .updateImg(this.file, '/images/gyms/' + this.user.uid + '/news/' + this.currentId + '/' + 'IMG_' + this.currentId);
      await this.getImgUrl(this.currentId).then((fileUrl) => {
        this.editNewsForm.value.id = this.currentId;
        this.editNewsForm.value.img.id = this.currentId;
        this.editNewsForm.value.img.url = fileUrl;
        this.adminService.updateNews(this.editNewsForm.value, this.currentId);
      })
    } else {
      this.editNewsForm.value.img.url = this.currentImg;
      this.editNewsForm.value.id = this.currentId;
      await this.adminService.updateNews(this.editNewsForm.value, this.currentId);
      // console.log(this.editNewsForm.value.id);
    }
    this.existImg = false;
    this.preview = this.currentImg;
    this.file = null;
    this.spinner.hide();
  }

  selectedFile(event: any) {
    const url = new FileReader();
    this.spinner.show();
    url.onload = (event: any) => {
      this.preview = event.target.result;
      this.existImg = true;
      this.spinner.hide();
    };
    url.readAsDataURL(event.target.files[0]);
    this.file = event.target.files[0];
  }

  async patchForm(position) {
    this.currentImg = this.news[position].img.url;
    this.currentId = this.news[position].id;
    // console.log(this.currentId);
    await this.editNewsForm.patchValue({
      content: this.news[position].content,
      img: {
        alt: this.news[position].img.alt,
      },
      title: this.news[position].title
    });
  }

  resetForm() {
    this.newsForm.reset({
      calories: '',
      content: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    });
    this.editNewsForm.reset({
      calories: '',
      content: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    })
    this.existImg = false;
    this.preview = this.currentImg;
    this.file = null;
  }

  async getImgUrl(fileId: any) {
    // console.log(fileId);
    return await this.fStorage.storage
      .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + this.user.uid + '/news/' + fileId + '/' + 'IMG_' + fileId)
      .getDownloadURL();
  }

  async confirm(id, img) {
    this.spinner.show();
    this.adminService.dropData('/adminGeneral/0/gyms/0/news/' + id);
    await this.adminService.dropImg(img);
    this.spinner.hide();
    // console.log("Blog deleted", id, img);
  }

  decline() {
    console.log("Operation canceled");
  }

}
