
import time
import sys
sys.path.append('/home/admin1/Galvanize/FinalProjectDE')
from itertools import permutations
from uberAPI import uberpricing
from messageProducer import genMessage

'''This is a job scheduler which sends a request to Uber API 
to get pricing Details and then send message to Kafka Topic.
'''

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
#loc_list=[loc1,loc2]
topic="test"

total_route=list(permutations(loc_list,2))
ordered_route=sorted(total_route,key=(lambda x:x[1]))

for route in ordered_route:
	message,key=uberpricing.getPriceEstimate(route[0][0],route[0][1],route[1][0],route[1][1])
	genMessage(message,key,topic)







