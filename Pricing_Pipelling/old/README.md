# RiseInPrice       

* Realtime mapping of Geolocation's in San Francisco for Uber Price Surge and Historical Analysis of surge behavior.

* Data Engineering Project for Galvanize MS in Data Science Program.  


![Surge Image](/uberUI/app/images/ubersurge.png)


#Introduction

Aim of this project is to :

Provide a realtime mapping of Geolocation's in San Francisco where price surge is happenning for Uber Cabs.

Historical analysis on the price surge data to study the surge behavior and how it relates with time.

#Data

Real time Data is being retrieved through uber API using a cron job.

For Historical Analysis once the real time data processing is done the flag in DB is changed to Batch Mode to do Batch Analysis.

#Data Pipeline and Architecture Diagram

![Architecture Diagram](/uberUI/app/images/ArchitectureDiagram.png)

* **Ingestion Layer**: Kafka is being used for Data Ingestion. As it is highly scalable , has low latency and high throughput.

 * Each start and end point i.e latitude and longitude is passed as Key with the message to store the location wise pricing detail. Key is prepared in the format 'start point latitude|start point  longitude|End point latitude | End point longitude'
 
 * Cron job call the UBER API to get the pricing details and then the keyed messages are published to a kafka topic.
 
* **Speed Layer**: Spark Streaming is being used for the stream processing. As spark streaming process data in micro batches it was suitable for this scenario as data from uber API refreshes after every minute.
  * Data processing and Transformation was done important fields were extracted from the json string. A string "R" was concatenated to the key to identify the real time processing on UI side.
  * Once the data was processed and transformed for each RDD it was saved to the Hbase Database.
  
* **Batch Layer**: The Batch layer is used for doing the historical data analysis on the price surge.
  * When the real time data is processed then the key which had "R" concatenated is changed to "B" for doing the batch analysis.
  * Graph is used to show the historical price surge behavior.
  

* **Database**: Hbase is used for data storage  because of its consistent and high scale distributed processing nature.
    It provides high speed read , writes and aggregation.
   * Key in DB is **R|start_latitude|start_longitude|end_latitude|end_longitude|timestamp** for realtime location mapping.
   * Key in DB is **B|start_latitude|start_longitude|end_latitude|end_longitude|timestamp** for historical analysis.
   
* **User Interface/Front-End**: Apache Flask framework is used to build the UI as it is light weight and easy to build.Google Maps API is used to show the realtime location's where price surge is happenning. 
  * Google Maps API is used to show the geolocation's in San Francisco where price surge is happenning in realtime.
  The markers displays the real time locations where there is surge in price.
  * Plotly.js is used for plotting the graph for Historical Analysis. Based on the options selected by user (i.e date , start point,end point , type of uber car) a plot is generated which displays the surge behavior.
  * Javascript and Ajax is used for rendering and implementing different features on UI .
  

* **Demo** 

  ###Realtime location mapping Snapshot
  ![Demo Snapshot](/uberUI/app/images/demosnap.png) 
  
   ###Surge Plot Snapshot
  ![Demo Snapshot](/uberUI/app/images/surgeplot.png) 
  
 * #Steps for Execution
   
  * Install Python Dependencies:  sudo pip install uber_rides,pyspark,kafka-python,happybase
  * Setting up the table in Hbase.
  * Create topics in Kafka.
  * Set up the cronjob : crontab /cronjob/uber_job.cron
  * Start Hbase : bin/start_hbase.sh
  * Start Thrift : bin/hbase thrift start
  * Start Kafka : bin/kafka-server-start.sh config/server.properties
  * Start Spark Streaming : bin/spark-submit --jars spark-streaming-kafka-assembly_2.10-1.6.0.jar,lib/spark-examples-1.6.0-hadoop2.6.0.jar,home/admin1/Software/hbase-1.1.3/lib/hbase-examples-1.1.3.jar  /home/admin1/Galvanize/FinalProjectDE/sparkstreaming/streamingdata_uber.py localhost:2181 test

  * Start Flask UI : uberUI/python run.py
  * Open the UI page: http://localhost:5000
 
  
  Project for <img src="http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-logo.svg" style="vertical-align:left" width="100px"/> MSDS
  
 COPYRIGHT
	All contributions by Deep Narain Singh:
 Copyright (c) 2016, Deep Narain Singh.
	All rights reserved.
	


  
  
  
 

 







