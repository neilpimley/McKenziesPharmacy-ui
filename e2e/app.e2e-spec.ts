import { PharmacyUIPage } from './app.po';

describe('pharmacy-ui App', function() {
  let page: PharmacyUIPage;

  beforeEach(() => {
    page = new PharmacyUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
