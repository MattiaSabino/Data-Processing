#!/usr/bin/env python
# Name: Mattia Sabino Caso
# Student number: 11017368
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''

import csv

from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'
First_element = 0

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).
    '''
     
    # Makes an empty list that will be filled in de forloop. 
    movies = []
    
    # This will be the greater forloop which will iterate 50 times through
    # the content.
    for content in dom.by_tag("div.lister-item-content")[:50]: 
       
       # These are two lists that will be emptied every time a new loop starts
       # and the purpose of these lists is to 1) make a list of every movie and
       # 2) a list of the actors of a movie and store it in the movie list.
        movie = []
        stars = []
        
        # Makes a variable named title of the first item of 
        # tag: h3.lister-item-header.
        titles = content.by_tag("h3.lister-item-header")[First_element]
        name = titles.by_tag("a")[First_element]
        
        # Takes the content of variable 'name' and doesn't encode it.
        title = plaintext(name.content.encode('ascii', 'ignore')\
                          .decode('ascii'))
        
        # IF the title is not given gives it a appropriate value.
        if title == '':
            movie.append('Missing Title')
        else:
            movie.append(title)
        
        
        rate = content.by_tag("div.inline-block ratings-imdb-rating")\
                              [First_element]
        grade = rate.by_tag("strong")[First_element]                    
        rating = plaintext(grade.content)
        if rating == '':
            movie.append('Missing Rating')
        else:
            movie.append(rating)

            
        genre = content.by_tag("span.genre")[First_element]               
        genre = plaintext(genre.content.encode('ascii', 'ignore')\
                          .decode('ascii'))
        if genre == '':
            movie.append('Missing Genre')
        else:
            movie.append(genre)
            
                
        actors = content.by_tag("p.")[2]
        for actor in actors.by_tag("a"):  
            actor = plaintext(actor.content.encode('ascii', 'ignore')\
                              .decode('ascii'))
            
            # Puts all the actors in the list stars.
            stars.append(actor)
        if stars[0] == '':
            movie.append('Missing Actors')
        else:
        
            # Joins the list stars in order to get rid of the u's.
            movie.append(', '.join(stars))

            
        runtime = content.by_tag("span.runtime")[First_element]                                
        runtime = plaintext(runtime.content.replace('min', '')) 
        if genre == '':
            movie.append('Missing Runtime')
        else:
            movie.append(runtime)
        
        # Puts the list of the movie in the list movies.
        movies.append(movie) 

    # Returns the movies list.   
    return{
        'movies':movies
    }    

    
def save_csv(f, tvseries):
    '''
    Outputs a CSV file containing highest rated TV-series.
    '''
    
    writer = csv.writer(f)
    
    # Writes the upper row with the column titles.
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    
    # Writes all the rows
    writer.writerows(tvseries['movies'])


if __name__ == '__main__':
    '''
    Calls extract and save functions and outputs the CSV file.
    '''
    
	# Download the HTML file.
    url = URL(TARGET_URL)
	
    html = url.download()
	
    # Save a copy to disk in the current directory, this serves as an backup.
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation.
    dom = DOM(html)	
    
    # Extract the tv series (using the function you implemented).
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header).
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
