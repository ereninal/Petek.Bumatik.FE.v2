import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/dashboard.service';
import { StatisticDashboard } from 'app/auth/models/statisticDashboard';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  loading:boolean = false;
  data:StatisticDashboard;
  constructor(private dashboardService:DashboardService) { }
  parentId:number;
  ngOnInit(): void {
    this.loading = true
    this.parentId = Number(localStorage.getItem("currentUserId"));
    this.getStatisticData(this.parentId);
  }
  getStatisticData(parentId:number){
    this.dashboardService.getStatisticData(parentId).subscribe((response)=>{
      this.data =response.data;
      this.loading = false;
    })
  }
}
