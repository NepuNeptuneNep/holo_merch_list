# holo_merch_list
Dynamically generates links to the hololive merchandise bundles in a list so it's easy to see all past merchandise without searching.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Deploy to github pages

We deploy by doing `npx ng build --configuration production --base-href /` on the main branch followed by `npx angular-cli-ghpages --dir=dist --branch=gh-pages`. As of now we have to manually reset the DNS record of tsunomaki.wata.me after every deployment.

