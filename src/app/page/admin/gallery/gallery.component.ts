import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  existImg = false;
  preview;
  file;
  imgCounter;
  imgForm = this.form.group({
    id: '',
    image: '',
    alt: ''
  })
  gallery: any;
  constructor(
    private adminService: AdminService,
    private form: FormBuilder,
    private fStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
      .subscribe((gyms: any) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const gym = gyms.find(gym => gym.uid == user.uid)
        this.gallery = gym.galery;
        this.imgCounter = gym.galery.length;
        console.log(this.imgCounter)
      })
  }

  async submit() {
    const fileId = new Date().getTime();
    const user = JSON.parse(localStorage.getItem('user'));

    await this.adminService
    .uploadGymImg(this.file, '/images/gyms/' + user.uid + '/' + this.imgCounter + '/' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.imgForm.value.id = this.imgCounter;
      this.imgForm.value.image = fileUrl;
      console.log(this.imgForm.value);
      this.adminService.addToGallery(this.imgForm.value, this.imgCounter);
    });

  }

  selectedFile(event: any) {
    const url = new FileReader();

    url.onload = (event: any) => {
      this.preview = event.target.result;
      this.existImg = true;
    };

    url.readAsDataURL(event.target.files[0]);
    this.file = event.target.files[0];
  }

  async getImgUrl(fileId: any) {
    const user = JSON.parse(localStorage.getItem('user'));

    return await this.fStorage.storage
    .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + user.uid + '/' + this.imgCounter + '/' + fileId)
    .getDownloadURL();
  }

  updateImage(id) {
    console.log("Image updated", id);
  }

  confirm(id: any) {
    this.adminService
    console.log("Image deleted", id);
  }

  decline() {
    console.log("Operation canceled");
  }

}
