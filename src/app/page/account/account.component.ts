import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PublicService } from "../../services/public.service";
import { FormGroup, FormControl } from '@angular/forms';

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
  dataUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl('')
  })
  

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.clientesSubscription = this.publicService.getUsers().subscribe((users: any) => {
      const user = users.find(user => user.uid == JSON.parse(localStorage.getItem("user")).uid);
      this.user = user;
      user['routines'] != null ? this.user["routines"] = Object.values(user["routines"]): console.log('no hay datos')
      user['diets'] != null ? this.user["diets"] = Object.values(user["diets"]) : console.log('no hay datos')
      // this.user["routines"] = Object.values(user["routines"])
      // this.user["diets"] = Object.values(user["diets"])
      console.log(this.user);
    });
  }

  confirmDeleteRoutine(id, routine) {
    let deleteSubscription = this.publicService.getUsers().subscribe((users: any) => {
      const user = JSON.parse(localStorage.getItem("user"));
      for (let index = 0; index < users.length; index++) {
        if (users[index].uid == user.uid) {
          this.publicService.deleteToRoutines(routine, index);
          deleteSubscription.unsubscribe()
        }
      }
    });
    
  }

  confirmDeleteDiet(diet) {
    let delete1Subscription = this.publicService.getUsers().subscribe((users: any) => {
      const user = JSON.parse(localStorage.getItem("user"));
      for (let index = 0; index < users.length; index++) {
        if (users[index].uid == user.uid) {
          this.publicService.deleteToDiet(diet, index);
          delete1Subscription.unsubscribe()
        }
      }
    });
    
  }

  updateInfoUser() {
    // this.dataUser.value.name = this.user.name;
    // this.dataUser.value.email = this.user.email;
    // this.user.height != null ? this.dataUser.value.height = this.user.height : console.log('listo')
    // this.user.weight != null ? this.dataUser.value.weight = this.user.weight : console.log('listo')
    // console.log(this.dataUser.value)
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe()
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
