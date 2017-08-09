import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string,books : Array<any> = [],newBooks:Array<any> = []){
		for (let book of value) {	
			let newBook = {
				id:book.id,
				title:book.volumeInfo.title,
				authors:book.volumeInfo.authors,
				desc:book.volumeInfo.description,
				img:book.volumeInfo.imageLinks.thumbnail
			};
			books.push(newBook);
		}
		if (input) {
			input = input.toLowerCase();
			books.forEach((book, index) => {
				if(book.title.toLowerCase().indexOf(input) > -1){
					newBooks.push(book);
				}
			});
			let body = document.getElementsByTagName('section')[0];
			body.classList.add("books_show");
		}
		return [newBooks];
	}
}