import {Component, ViewEncapsulation, Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';
import {FilterPipe} from './pipes';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [],
	encapsulation: ViewEncapsulation.None
})

export class AppComponent {
	title = 'Search Books from Google';
	books:any;
	queryString:any;
	active_list:any;
	cart_list: string = "";
	cart_cont:any = localStorage;
	titles:Object;
	constructor(public http: Http) {
		this.http.request('https://www.googleapis.com/books/v1/volumes?q=food+allergies&maxResults=5')
		.subscribe((res: Response) => {
			this.titles = res.json()['items'];
		});
	}
	public open(link) {
		(document.getElementById('title') as HTMLImageElement).textContent = link.title;
		(document.getElementById('authors') as HTMLImageElement).textContent = link.authors;
		(document.getElementById('desc') as HTMLImageElement).textContent = link.desc;
		(document.getElementById('thumb') as HTMLImageElement).src = link.img;
		(<HTMLInputElement>document.getElementById("id")).value = link.id;
		let body = document.getElementsByTagName('section')[0];
		body.classList.add("book_open");
	}
	public cart(){
		let title =(document.getElementById('title') as HTMLImageElement).textContent;
		let authors = (document.getElementById('authors') as HTMLImageElement).textContent;
		let desc = (document.getElementById('desc') as HTMLImageElement).textContent;
		let img = (document.getElementById('thumb') as HTMLImageElement).src;
		let id = (<HTMLInputElement>document.getElementById("id")).value;
		let book = {
			id:id,
			title:title,
			authors:authors,
			desc:desc,
			img:img
		};
		this.cart_cont[id] = book;
		localStorage.setItem(id, JSON.stringify(book));
	}
	close(){
		let body = document.getElementsByTagName('section')[0];
		body.classList.remove("book_open");
	}
	close_cart(){
		let body = document.getElementsByTagName('section')[0];
		body.classList.remove("open_cart");
	}
	show_cart(){
		let cart = this.cart_cont;
		this.cart_list = '';
		for(let books in cart) {
			let book = JSON.parse(cart[books]);
			let id = book['id'];
			let title = book['title'];
			let author = book['authors'];
			let img = book['img'];
			let desc = book['desc'];
			this.cart_list = this.cart_list+"<ul><li class='img'><img src='"+img+"'/></li><li class='book_info'><span class='title'>"+title+"</span><span class='author'>"+author+"</span><span class='desc'>"+desc+"</span></li></ul>";
		}
		let body = document.getElementsByTagName('section')[0];
		body.classList.add("open_cart");
		body.classList.remove("book_open");
	}
};































