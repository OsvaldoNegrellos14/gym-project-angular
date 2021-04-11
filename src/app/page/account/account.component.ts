import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PublicService } from "../../services/public.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormGroupName,
} from "@angular/forms";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
  clientesSubscription: Subscription;
  user: any = {
    name: "",
    email: "",
    height: "",
    weight: "",
    routines: [],
    diets: [],
  };
  dataUserGym = this.form.group({
    uid: '',
    email: "",
    info: new FormGroup({
      height: new FormControl(""),
      weight: new FormControl(""),
      name: new FormControl(""),
      age: new FormControl("")
    }),
  });

  dataUser= this.form.group({
    age: '',
    height: "",
    name: "",
    weight: ""
  });

  constructor(
    private publicService: PublicService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clientesSubscription = this.publicService
      .getUsers()
      .subscribe((users: any) => {
        const user = users.find(
          (user) => user.uid == JSON.parse(localStorage.getItem("user")).uid
        );
        this.user = user;
        user["routines"] != null
          ? (this.user["routines"] = Object.values(user["routines"]))
          : console.log("no hay datos");
        user["diets"] != null
          ? (this.user["diets"] = Object.values(user["diets"]))
          : console.log("no hay datos");
        this.dataUserGym.patchValue({
          uid: this.user.uid,
          email: this.user.email,
          info: {
            height: this.user.info.height,
            weight: this.user.info.weight,
            name: this.user.info.name,
            age: this.user.info.age
          }
        });
        
        console.log(this.user);
      });
  }

  confirmDeleteRoutine(id, routine) {
    let deleteSubscription = this.publicService
      .getUsers()
      .subscribe((users: any) => {
        const user = JSON.parse(localStorage.getItem("user"));
        for (let index = 0; index < users.length; index++) {
          if (users[index].uid == user.uid) {
            this.publicService.deleteToRoutines(routine, index);
            deleteSubscription.unsubscribe();
          }
        }
      });
  }

  confirmDeleteDiet(diet) {
    let delete1Subscription = this.publicService
      .getUsers()
      .subscribe((users: any) => {
        const user = JSON.parse(localStorage.getItem("user"));
        for (let index = 0; index < users.length; index++) {
          if (users[index].uid == user.uid) {
            this.publicService.deleteToDiet(diet, index);
            delete1Subscription.unsubscribe();
          }
        }
      });
  }

  updateInfoUser() {
    this.dataUser.patchValue({
      age: this.dataUserGym.value.info.age,
      height: this.dataUserGym.value.info.height,
      name: this.dataUserGym.value.info.name,
      weight: this.dataUserGym.value.info.weight
    })
    this.dataUserGym.value.email = this.user.email
    this.publicService.updateInfoUser(this.dataUserGym.value, this.dataUser.value)
    // console.log(this.dataUserGym.value);
    // console.log(this.dataUser.value);
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
    // this.user = {
    //   name: "",
    //   email: "",
    //   height: "",
    //   weight: "",
    //   routines: [],
    //   diets: [],
    // }
  }
}
