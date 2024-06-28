import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { ContentService } from 'src/app/core/services/content.service';
import { UserService } from 'src/app/core/services/user.service';
import { ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalContent: number = 0;
  totalMedia: number = 0;
  recentContent: IContent[] = [];
  listOfUsers: IUser[] = [];

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
    private contentService: ContentService,
  ) { }

  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadTotalContent();
    this.loadRecentContent();
    this.loadRecentUser();
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

  loadTotalContent(): void {
    this.contentService.showAllContent().subscribe(
      (content: IContent[]) => {
        this.totalContent = content.length;
        this.totalMedia = content.filter(c => c.media).length;
        this.updateChart();
      },
      (error) => {
        console.error('Error loading total content:', error);
      }
    );
  }

  loadRecentContent(): void {
    this.contentService.showAllContent().subscribe(
      (content: IContent[]) => {
        this.recentContent = content.sort((a, b) => {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        }).slice(0, 5);
      },
      (error) => {
        console.error('Error loading recent content:', error);
      }
    );
  }

  loadRecentUser(): void {
    this.userService.allUser().subscribe(
      (users: IUser[]) => {
        this.listOfUsers = users.sort((a, b) => {
          return new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime();
        }).slice(0, 5);
      },
      (error) => {
        console.error('Error loading recent users:', error);
      }
    );
  }

  updateChart(): void {
    this.barChartData.datasets[0].data = [this.totalUsers, this.totalContent, this.totalUsers];
  }
}
