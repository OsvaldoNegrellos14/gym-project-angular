import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  file;
  preview;
  existImg = false;
  currentImg;
  currentId;
  routines: any;
  routineForm = this.form.group({
    calories: '',
    category: '',
    content: '',
    duration: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    name: ''
  });
  editRoutineForm = this.form.group({
    calories: '',
    category: '',
    content: '',
    duration: '',
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
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.adminService.getGyms()
      .subscribe((gyms: any) => {
        const gym = gyms.find(gym => gym.uid == this.user.uid)
        this.routines = Object.values(gym.routines);
        // console.log(this.routines)
        this.spinner.hide();
      })
  }

  async submitNewRoutine() {
    this.spinner.show();
    const fileId = this.genFileId();

    await this.adminService.uploadImg(this.file, '/images/gyms/' + this.user.uid + '/routines/' + fileId + '/' + 'IMG_' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.routineForm.value.id = fileId;
      this.routineForm.value.img.id = fileId;
      this.routineForm.value.img.url = fileUrl;
      // console.log(this.routineForm.value);
      this.adminService.setRoutine(this.routineForm.value, fileId);
      this.existImg = false;
      this.preview = null;
      this.resetForm();
    });
    this.spinner.hide();

  }
  async submitEditedRoutine() {
    this.spinner.show();
    if (this.file) {
      // console.log('new img', this.file);
      // console.log(this.currentId);
      await this.adminService
        .updateImg(this.file, '/images/gyms/' + this.user.uid + '/routines/' + this.currentId + '/' + 'IMG_' + this.currentId);
      await this.getImgUrl(this.currentId).then((fileUrl) => {
        this.editRoutineForm.value.id = this.currentId;
        this.editRoutineForm.value.img.id = this.currentId;
        this.editRoutineForm.value.img.url = fileUrl;
        this.adminService.setRoutine(this.editRoutineForm.value, this.currentId);
      })
    } else {
      this.editRoutineForm.value.img.url = this.currentImg;
      this.editRoutineForm.value.id = this.currentId;
      await this.adminService.setRoutine(this.editRoutineForm.value, this.currentId);
      // console.log(this.editRoutineForm.value.id);
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
      .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + this.user.uid + '/routines/' + fileId + '/' + 'IMG_' + fileId)
      .getDownloadURL();
  }

  genFileId() {
    return new Date().getTime();
  }

  async patchForm(position) {
    this.currentImg = this.routines[position].img.url;
    this.currentId = this.routines[position].id;
    // console.log(this.currentId);
    await this.editRoutineForm.patchValue({
      calories: this.routines[position].calories,
      category: this.routines[position].category,
      content: this.routines[position].content,
      duration: this.routines[position].duration,
      img: {
        alt: this.routines[position].img.alt,
      },
      name: this.routines[position].name
    });
  }

  resetForm() {
    this.routineForm.reset({
      calories: '',
      category: '',
      content: '',
      duration: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    });
    this.editRoutineForm.reset({
      calories: '',
      category: '',
      content: '',
      duration: '',
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
    this.adminService.dropData('/adminGeneral/0/gyms/0/routines/' + id);
    await this.adminService.dropImg(img);
    this.spinner.hide();
    // console.log("Routine deleted", id, img);
  }

  decline() {
    console.log("Operation canceled");
  }

}
