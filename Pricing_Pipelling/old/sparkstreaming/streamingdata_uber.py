import pyspark
import sys
import json
import ast
import datetime
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils
from pyspark import SparkConf

topic="test"

sc=pyspark.SparkContext()

def SaveRecord(rdd):  
    host = 'localhost:2181'  
    table = 'uber_price_estimate'  
    keyConv = "org.apache.spark.examples.pythonconverters.StringToImmutableBytesWritableConverter"  
    valueConv = "org.apache.spark.examples.pythonconverters.StringListToPutConverter"  
    conf = {"hbase.zookeeper.quorum": host,  
        "hbase.mapred.outputtable": table,  
        "mapreduce.outputformat.class": "org.apache.hadoop.hbase.mapreduce.TableOutputFormat",  
        "mapreduce.job.output.key.class": "org.apache.hadoop.hbase.io.ImmutableBytesWritable",  
        "mapreduce.job.output.value.class": "org.apache.hadoop.io.Writable"}  


     
    #datamap = rdd.map(lambda x: (x[0]['product_id'],x[0]['product_id'],"uberfamily","uber_price_json",x[0])) 
    datamap = rdd.map(lambda x: mapjson(x))
    datamap.saveAsNewAPIHadoopDataset(conf=conf,keyConverter=keyConv,valueConverter=valueConv) 
    

def mapjson(price):
	
	z=price[1].encode('ascii')
	k=price[0].encode('ascii')
	pkey=k+"|"+ str(datetime.datetime.now())
	z = ast.literal_eval(z)
	resp=("R"+"|"+pkey,["R"+"|"+pkey,"uberfamily","uber_price_json",json.dumps(z)])
	return resp


ssc=StreamingContext(sc,60)
zkQuorum, topic = sys.argv[1:]
kvs=KafkaUtils.createStream(ssc, zkQuorum, "spark-streaming-consumer", {topic: 1})
lines = kvs.map(lambda x: [x[0],x[1]])
lines.pprint()
lines.foreachRDD(SaveRecord) 
ssc.start()
ssc.awaitTermination()

