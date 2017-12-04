import time
from datetime import datetime
from kafka import KafkaClient, KeyedProducer, SimpleProducer

'''This is a program to send message to Kafka Topic. Start and End point is used as unique Key for the Keyed producer'''

kafka=KafkaClient("localhost:9092")

def genMessage(msg,key,topic):
	producer = KeyedProducer(kafka)
	producer.send_messages(topic,key, msg)