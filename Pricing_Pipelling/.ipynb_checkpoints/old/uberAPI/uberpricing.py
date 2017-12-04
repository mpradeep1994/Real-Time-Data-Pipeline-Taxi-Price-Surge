

from uber_rides.session import Session
from uber_rides.client import UberRidesClient
#Add the token
session = Session(server_token='')

def getPriceEstimate(start_lat,start_long,end_lat,end_long):

	client = UberRidesClient(session)
	p=client.get_price_estimates(start_lat,start_long,end_lat,end_long)
	key=str(start_lat)+"|"+str(start_long)+"|"+str(end_lat)+"|"+str(end_long)
	
	return str(p.json.get('prices')),key
