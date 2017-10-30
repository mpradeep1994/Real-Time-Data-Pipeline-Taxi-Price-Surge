
# coding: utf-8

# In[1]:


import time
import sys
sys.path.append('PriceRequest_UberAPI/')
from itertools import permutations


# In[2]:


from kafka import KafkaClient, KeyedProducer, SimpleProducer

'''This is a program to send message to Kafka Topic. Start and End point is used as unique Key for the Keyed producer'''

kafka=KafkaClient("localhost:9092")
producer = KeyedProducer(kafka)
def genMessage(msg,key,topic):
    producer.send_messages(topic,key, msg)


# In[3]:


from uber_rides.session import Session
from uber_rides.client import UberRidesClient
#Add the token
session = Session(server_token='DGdtuZb4i7zwENbYaVSPwuXLBtnzwkI2DigBmtmf')
def getPriceEstimate(start_lat,start_long,end_lat,end_long):
    client = UberRidesClient(session)
    p=client.get_price_estimates(start_lat,start_long,end_lat,end_long)
    key=str(start_lat)+"|"+str(start_long)+"|"+str(end_lat)+"|"+str(end_long)
    return str(p.json.get('prices')),key


# In[4]:


#List of Locations
loc1=(37.787817,-122.396595)#Galvanize
loc2=(37.776908,-122.394825)#Caltrain
loc3=(37.810470, -122.476624)#
loc4=(37.775505, -122.446444)#USF
loc5=(37.810604,-122.409856)#Pier39
loc6=(37.687802, -122.470648)#Daly City
loc7=(37.737842, -122.431546)#GlenPark
loc8=(37.768719, -122.488666)#GoldenGatePark
loc9=(37.621206, -122.388759)#Airport
loc10=(37.692554, -122.432361)#San Bruno MOuntain State Park
loc_list=[loc1,loc2,loc3,loc4,loc5,loc6,loc7,loc8,loc9,loc10]
topic="test"

total_route=list(permutations(loc_list,2))
ordered_route=sorted(total_route,key=(lambda x:x[1]))


# In[5]:


'''This is a job scheduler which sends a request to Uber API 
to get pricing Details and then send message to Kafka Topic.
'''
for route in ordered_route:
    message,key=getPriceEstimate(route[0][0],route[0][1],route[1][0],route[1][1])
    genMessage(message,key,topic)

