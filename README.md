
# REAL-TIME DATA PIPELINE TO ANALYZE TAXI PRICE SURGE         
```
In this approach I focused on finding the Price behavior fot taxi fare for every hour. We can use Uber API or Lift API to get the price details through their API.
Collection price data from every location in United States for every 5 minutes is setup as a CRON job which ends up collecting large amount of data every day. 
We should use a message broker to queue the data because it’s a real-time data and at the same time we need the order of the messages
collected so Kafka can be used as a message broker as it solves this problem working in a distributed environment.
Apache Spark is used to process the streaming data by filtering and aggregating values and selecting all the required features for future processing.
Apache Spark’s basic component is made up of RDD (Resilient Distributed Dataset) and it is processed in memory and based on lazy 
execution in a distributed environment, it is capable of handling streaming data.
HBase is preferred to be used is this scenario where the datastore tables store the aggregate views for hour of day, day of week of each
locations price and its surge in price is calculated from previous data. 
The table is designed with multiple partitions to support fast retrieval in an efficient way. 
Using a Web UI we can show the locations which are hiked in price for every location. 

```
