# Mattia Sabino Caso
#Data-processing
#
#CSV2JSON converter

import csv
import json



# Opens the json file  giving it write permission.
with open ('neerslag.json', 'w') as jsonfile:

    # Opens the csv file.
    with open ('neerslag.csv', 'r') as csvfile:
    
        # Reads through the csv file and saves it as reader.
        reader = csv.DictReader(csvfile)
        
        test = []
        for row in reader:
            test.append(row)
            #test.append('\n')
            
        
        
        
        json.dump(test, jsonfile, indent = 2)
       # jsonfile.write('\n')


        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        # Loop through every row in readers.
        #for row in reader:   
        
            # Writes it in the json file.
            
            #print json.dump(row, jsonfile, indent=1)
            #jsonfile.write(json.dumps(row) + '\n')

            
    

    
    