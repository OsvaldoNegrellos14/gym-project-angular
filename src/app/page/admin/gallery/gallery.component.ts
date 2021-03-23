import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  existImg = false;
  preview;
  file;
  imgCounter;
  imgForm = this.form.group({
    id: '',
    img: '',
    alt: ''
  })
  gallery: any;
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
        this.gallery = Object.values(gym.gallery);
        this.imgCounter = gym.gallery.length;
        // console.log(this.gallery)
        this.spinner.hide();
      })
  }

  async submit() {
    this.spinner.show();
    const fileId = new Date().getTime();

    await this.adminService
      .uploadImg(this.file, '/images/gyms/' + this.user.uid + '/gallery/' + fileId + '/' + 'IMG_' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.imgForm.value.id = fileId;
      this.imgForm.value.img = fileUrl;
      this.adminService.addToGallery(this.imgForm.value, fileId);
      this.resetForm();
      this.existImg = false;
      this.preview = null;
      this.spinner.hide();
    });
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
    return await this.fStorage.storage
      .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + this.user.uid + '/gallery/' + fileId + '/' + 'IMG_' + fileId)
      .getDownloadURL();
  }

  // updateImage(id) {
  //   console.log("Image updated", id);
  // }

  resetForm() {
    this.imgForm.reset();
  }

  async confirm(img, id: any) {
    this.spinner.show();
    this.adminService.dropData('/adminGeneral/0/gyms/0/gallery/' + id);
    await this.adminService.dropImg(img);
    // console.log("Image deleted", id);
    this.spinner.hide();
  }

  decline() {
    console.log("Operation canceled");
  }

}
