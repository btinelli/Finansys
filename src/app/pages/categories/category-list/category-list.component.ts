import { element } from 'protractor';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  private categories: Category[] = []
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar lista')
    )
  }

  deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir este item?')
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Erro ao tentar excluir')
      )

    }
  }


}
