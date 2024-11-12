import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from '../../service/dataservice.service';
import { HttpClient } from '@angular/common/http';
import { BusService } from '../../service/bus.service';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit{
  passseatarray:any[]=[]
  passfare:number=0
  routedetails:any=[]
  busdeparturetime:number=0
  busarrivaltime:number=0
  customerid:any={}
  operatorname:string=''
  passengerdetails:any=[]
  email:string=''
  busid:string=''
  phonenumber:string=''
  departuredetails:any={}
  arrivaldetails:any={}
  duration:string=''
  isbusinesstravel:boolean=false
  isinsurance:boolean=false
  iscoviddonated:Boolean=false
  bookingdate:string=new Date().toISOString().split('T')[0] 

  constructor(private route:ActivatedRoute, private dataservice : DataserviceService, private http:HttpClient, private busservice:BusService ){}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const passSeatsArray = params['selectedseat'];
      const email = params['passemail'];
      const phoneNumber = params['passphn'];
      const isBusinessTravel = params['passisbuisness'];
      const isInsurance = params['passinsurance'];
      const passFare=params['seatprice'];
      const busId=params['busid'];
      const busArrivalTime=params['busarrivaltime'];
      const busDepartureTime=params['busdeparturetime'];
      const iscoviddonated=params['passiscoviddonate'];
      const operatorname=params['operatorname']
      this.operatorname=operatorname
      this.passseatarray=passSeatsArray
      this.email=email
      this.phonenumber=phoneNumber
      this.isbusinesstravel=isBusinessTravel
      this.isinsurance=isInsurance
      this.passfare=passFare
      this.busid=busId
      this.busarrivaltime=busArrivalTime
      this.busdeparturetime=busDepartureTime
      this.iscoviddonated=iscoviddonated
      this.getloggedinuser()
    })
    this.dataservice.currentdata.subscribe(data=> {
      this.routedetails=data;
      console.log(data)
    })
    this.dataservice.passdata.subscribe(data=>{
      this.passengerdetails=data;
      console.log(data)
    })
  }
  getloggedinuser():any{
    const loggedinuserjson=sessionStorage.getItem("Loggedinuser");
    if(loggedinuserjson){
      this.customerid=JSON.parse(loggedinuserjson)
    }
    else{
      alert("please login to continue")
    }
    return null;
  }

  makepayment():void{
    let myBooking: any= {}
      myBooking.customerId=this.customerid._id;
      myBooking.passengerDetails=this.passengerdetails;
      myBooking.email=this.customerid.email;
      myBooking.phoneNumber=this.phonenumber;
      myBooking.status="upcoming";
      myBooking.fare = this.passfare;
      myBooking.busId = this.busid;
      let date=new Date();
      //myBooking.bookingDate=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
      myBooking.bookingDate=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      myBooking.seats = this.passseatarray;
      myBooking.departureDetails = {city:this.routedetails.departureLocation.name,
        time:this.busdeparturetime,
        date:this.bookingdate
      }
      myBooking.arrivalDetails = {city:this.routedetails.arrivalLocation.name,
        time:this.busarrivaltime,
        date:this.bookingdate
    }
    myBooking.duration = this.routedetails.duration;
    myBooking.isBusinessTravel = this.isbusinesstravel;
    myBooking.isInsurance = this.isinsurance;
    myBooking.isCovidDonated = this.iscoviddonated;
    //console.log(myBooking)
    this.busservice.addbusmongo(myBooking).subscribe({
      next:(response)=>{
        console.log("Bus post request success",response);
      },
      error:(error)=>{
        console.error('Post request failed', error);
      }
    })
  }
}  
