import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public apiURL = 'http://localhost:5010/api/Article/GetLatest?page=';
    public appTitle = "Tech News Hub";
    public appSubtitle = "Stay Informed with the Latest Trends, Innovations, and Insights in the Tech World";
    public listTitle = "List of Articles";
    public loading = "Loading...";
    public urlError = "URL not found";
    public error = "Error";
    public search = "Search in this page";
    public emptyList = "No results found for"
}