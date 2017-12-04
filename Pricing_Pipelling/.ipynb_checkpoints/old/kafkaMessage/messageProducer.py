import time
from datetime import datetime
from kafka import KafkaClient, KeyedProducer, SimpleProducer
'''This is a Kafka message producer'''


kafka=KafkaClient("localhost:9092")

def genMessage(msg,topic):
	producer = SimpleProducer(kafka)
	producer.send_messages(topic, msg + str(datetime.now().time()) )