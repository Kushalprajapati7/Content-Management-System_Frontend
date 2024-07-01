import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { IMedia } from 'src/app/core/interfaces/mediaInterface';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { MediaService } from 'src/app/core/services/media.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChartData, ChartDataset } from 'chart.js';
import { ContentService } from 'src/app/core/services/content.service';
import { IContent } from 'src/app/core/interfaces/contentInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalContent: number = 0;
  totalMedia: number = 0;
  recentMedia: IMedia[] = [];
  recentUsers: IUser[] = [];
  recentContent: IContent[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Users', 'Content', 'Media'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [0, 0, 0], label: 'Statistics' }
    ]
    
  };
  constructor(
    private userService: UserService,
    private mediaService: MediaService,
    private conentService: ContentService,
  ) { }

  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadTotalMedia();
    this.loadRecentMedia();
    this.loadRecentUser();
    this.loadTotalContent();
    this.loadRecentContent();
  }

  loadTotalUsers(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.totalUsers = users.length;
        this.updateChart();
      },
      (error) => {
        console.error('Error loading total users:', error);
      }
    );
  }

  loadTotalMedia(): void {
    this.mediaService.showAllMedia().subscribe(
      (media: IMedia[]) => {
        this.totalMedia = media.length;
        this.updateChart();
      },
      (error) => {
        console.error('Error loading total Media:', error);
      }
    );
  }

  loadTotalContent():void{
    this.conentService.showAllContent().subscribe(
      (content:IContent[])=>{
        this.totalContent = content.length;
        this.updateChart();
      },
      (error) => {
        console.error('Error loading total Content:', error);
      }
    )
  }

  loadRecentMedia(): void {
    this.mediaService.showAllMedia().subscribe(
      (media: IMedia[]) => {
        this.recentMedia = media.sort((a, b) => {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        }).slice(0, 4);
      },
      (error) => {
        console.error('Error loading recent Media:', error);
      }
    );
  }

  loadRecentUser(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.recentUsers = users.sort((a, b) => {
          return new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime();
        }).slice(0, 4);
      },
      (error) => {
        console.error('Error loading recent users:', error);
      }
    );
  }
  loadRecentContent():void{
    this.conentService.showAllContent().subscribe(
      (content:IContent[])=>{
        this.recentContent = content.sort((a, b) => {
          return new Date(b.uploadedAt as any).getTime() - new Date(a.uploadedAt as any).getTime();
        }).slice(0, 4);
      },
      (error)=>{
        console.error('Error loading recent content:', error);

      }
    )
  }
  
  

  updateChart(): void {
    this.barChartData.datasets[0].data = [this.totalUsers, this.totalContent, this.totalMedia];
  }
}
