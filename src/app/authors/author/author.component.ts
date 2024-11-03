import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Author } from '../model/author';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../service/authors.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor: any = null;
  private subscription: Subscription = new Subscription();
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: () => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
