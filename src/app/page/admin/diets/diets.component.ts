import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  currentId;
  file;
  preview;
  currentImg;
  existImg = false;
  diets:any;
  contentPreview;

  dietForm = this.form.group({
    calories: '',
    content: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    name: ''
  });

  editDietForm = this.form.group({
    calories: '',
    content: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    name: ''
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
    .subscribe((gyms:any) => {
      const gym = gyms.find(gym => gym.uid == this.user.uid)
      this.diets = Object.values(gym.diets);
      // console.log(this.diets)
      this.spinner.hide();
    })
  }

  async submitNewDiet() {
    this.spinner.show();
    const fileId = new Date().getTime();

    await this.adminService.uploadImg(this.file, '/images/gyms/' + this.user.uid + '/diets/' + fileId + '/' + 'IMG_' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.dietForm.value.id = fileId;
      this.dietForm.value.img.id = fileId;
      this.dietForm.value.img.url = fileUrl;
      // console.log(this.editDietForm.value);
      this.adminService.setDiet(this.dietForm.value, fileId);
      this.existImg = false;
      this.preview = null;
      this.resetForm();
    });
    this.spinner.hide();

  }

  async submitEditedDiet() {
    this.spinner.show();
    if (this.file) {
      // console.log('new img', this.file);
      // console.log(this.currentId);
      await this.adminService
        .updateImg(this.file, '/images/gyms/' + this.user.uid + '/diets/' + this.currentId + '/' + 'IMG_' + this.currentId);
      await this.getImgUrl(this.currentId).then((fileUrl) => {
        this.editDietForm.value.id = this.currentId;
        this.editDietForm.value.img.id = this.currentId;
        this.editDietForm.value.img.url = fileUrl;
        this.adminService.updateDiet(this.editDietForm.value, this.currentId);
      })
    } else {
      this.editDietForm.value.img.url = this.currentImg;
      this.editDietForm.value.id = this.currentId;
      await this.adminService.updateDiet(this.editDietForm.value, this.currentId);
      // console.log(this.editDietForm.value.id);
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

  async getImgUrl(fileId: any) {
    // console.log(fileId);
    return await this.fStorage.storage
      .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + this.user.uid + '/diets/' + fileId + '/' + 'IMG_' + fileId)
      .getDownloadURL();
  }

  async patchForm(position) {
    this.currentImg = this.diets[position].img.url;
    this.currentId = this.diets[position].id;
    // console.log(this.currentId);
    await this.editDietForm.patchValue({
      calories: this.diets[position].calories,
      category: this.diets[position].category,
      content: this.diets[position].content,
      duration: this.diets[position].duration,
      img: {
        alt: this.diets[position].img.alt,
      },
      name: this.diets[position].name
    });
  }

  resetForm() {
    this.dietForm.reset({
      calories: '',
      content: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    });
    this.editDietForm.reset({
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

  async confirm(id, img) {
    this.spinner.show();
    this.adminService.dropData('/adminGeneral/0/gyms/0/diets/' + id);
    await this.adminService.dropImg(img);
    this.spinner.hide();
    // console.log("Diet deleted", id, img);
  }

  decline() {
    console.log("Operation canceled");
  }

}
