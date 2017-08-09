import { BooksPage } from './app.po';

describe('books App', () => {
  let page: BooksPage;

  beforeEach(() => {
    page = new BooksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
