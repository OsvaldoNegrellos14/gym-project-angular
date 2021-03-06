import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  currentId;
  file;
  preview;
  currentImg;
  existImg = false;
  gym: any;
  coaches: any;

  gymForm = this.form.group({
    address: '',
    admin: '',
    email: '',
    name: '',
    phone: '',
    schedule: '',
    social: new FormGroup({
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      youtube: new FormControl('')
    }),
    // week: new FormGroup({
    //   friday: new FormControl(''),
    //   monday: new FormControl(''),
    //   saturday: new FormControl(''),
    //   sunday: new FormControl(''),
    //   thursday: new FormControl(''),
    //   tuesday: new FormControl(''),
    //   wednesday: new FormControl('')
    // })
  });

  coachForm = this.form.group({
    biography: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    name: '',
    rol: '',
    social: new FormGroup({
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      youtube: new FormControl('')
    }),
    specialty: ''
  });

  editedCoachForm = this.form.group({
    biography: '',
    img: new FormGroup({
      alt: new FormControl(''),
      id: new FormControl(''),
      url: new FormControl('')
    }),
    name: '',
    rol: '',
    social: new FormGroup({
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      twitter: new FormControl(''),
      youtube: new FormControl('')
    }),
    specialty: ''
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
        this.coaches = Object.values(gyms.find(gym => gym.uid == this.user.uid).coaches);
        const gymData = gyms.find(gym => gym.uid == this.user.uid).info;
        this.gymForm.patchValue({
          address: gymData.address,
          admin: gymData.admin,
          email: gymData.email,
          name: gymData.name,
          phone: gymData.phone,
          schedule: gymData.schedule,
          social: {
            facebook: gymData.social.facebook,
            instagram: gymData.social.instagram,
            twitter: gymData.social.twitter,
            youtube: gymData.social.youtube
          }
        })
        // this.gym = Object.values(gyms.find(gym => gym.uid == this.user.uid));
        // console.log(this.gym);
        // console.log(this.coaches);
        this.spinner.hide();
      });

  }

  async submitGymInfo() {
    await this.adminService.setAdminData(this.gymForm.value);
  }

  async submitCoach() {
    this.spinner.show();
    const fileId = new Date().getTime();

    await this.adminService.uploadImg(this.file, '/images/gyms/' + this.user.uid + '/coaches/' + fileId + '/' + 'IMG_' + fileId);

    this.getImgUrl(fileId).then((fileUrl) => {
      this.coachForm.value.id = fileId;
      this.coachForm.value.img.id = fileId;
      this.coachForm.value.img.url = fileUrl;
      // console.log(this.editedCoachForm.value);
      this.adminService.setCoach(this.coachForm.value, fileId);
      this.existImg = false;
      this.preview = null;
      this.resetForm();
    });
    this.spinner.hide();

  }

  async submitEditedCoaches() {
    this.spinner.show();
    if (this.file) {
      // console.log('new img', this.file);
      // console.log(this.currentId);
      await this.adminService
        .updateImg(this.file, '/images/gyms/' + this.user.uid + '/coaches/' + this.currentId + '/' + 'IMG_' + this.currentId);
      await this.getImgUrl(this.currentId).then((fileUrl) => {
        this.editedCoachForm.value.id = this.currentId;
        this.editedCoachForm.value.img.id = this.currentId;
        this.editedCoachForm.value.img.url = fileUrl;
        this.adminService.setCoach(this.editedCoachForm.value, this.currentId);
      })
    } else {
      this.editedCoachForm.value.img.url = this.currentImg;
      this.editedCoachForm.value.id = this.currentId;
      await this.adminService.setCoach(this.editedCoachForm.value, this.currentId);
      // console.log(this.editedCoachForm.value.id);
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

  async patchCoachForm(position) {
    this.currentImg = this.coaches[position].img.url;
    this.currentId = this.coaches[position].id;
    // console.log(this.currentId);
    await this.editedCoachForm.patchValue({
      biography: this.coaches[position].biography,
      img: {
        alt: this.coaches[position].img.alt
      },
      name: this.coaches[position].name,
      rol: this.coaches[position].rol,
      social: {
        facebook: this.coaches[position].social.facebook,
        instagram: this.coaches[position].social.instagram,
        twitter: this.coaches[position].social.twitter,
        youtube: this.coaches[position].social.youtube
      },
      specialty: this.coaches[position].specialty
    })
  }

  resetForm() {
    this.coachForm.reset({
      calories: '',
      content: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    });

    this.editedCoachForm.reset({
      calories: '',
      content: '',
      img: new FormGroup({
        alt: new FormControl(''),
      }),
      name: ''
    });

    this.existImg = false;
    this.preview = this.currentImg;
    this.file = null;
  }

  resetInput(input) {
    this.coachForm.reset({
    })
  }

  async getImgUrl(fileId: any) {
    // console.log(fileId);
    return await this.fStorage.storage
      .refFromURL('gs://gym-utt.appspot.com/images/gyms/' + this.user.uid + '/coaches/' + fileId + '/' + 'IMG_' + fileId)
      .getDownloadURL();
  }

  async confirm(id, img) {
    this.spinner.show();
    this.adminService.dropData('/adminGeneral/0/gyms/0/coaches/' + id);
    await this.adminService.dropImg(img);
    // console.log("Blog deleted", id, img);
    this.spinner.hide();
  }

  decline() {
    console.log("Operation canceled");
  }

}
