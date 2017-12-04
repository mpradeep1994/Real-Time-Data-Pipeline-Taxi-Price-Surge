from app import app
import json
import happybase
import time
from flask import jsonify, render_template, request
import ast

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')


@app.route('/maps')
def maps():
    return render_template('index.html')

@app.route('/realtime')
def realtime():
    conn = happybase.Connection()
    table = conn.table('uber_price_estimate')
    
    cabs_uberx=[]
    cabs_uberxl=[]
    cabs_uberblack=[]
    cabs_ubersuv=[]
    loc_dict={}
    for key, val in table.scan(row_prefix='R'):
    	val_list= json.loads(val['uberfamily:uber_price_json'])
    	s=key.split("|")
    	for value in val_list:
            if value['display_name']=='uberX':
                cabs_uberx.append({'name':value['display_name'],'surge':value['surge_multiplier'], 'lat': s[1], 'lng': s[2]})
            elif value['display_name']=='uberXL':
                cabs_uberxl.append({'name':value['display_name'],'surge':value['surge_multiplier'], 'lat': s[1], 'lng': s[2]})
            elif value['display_name']=='UberBLACK':
                cabs_uberblack.append({'name':value['display_name'],'surge':value['surge_multiplier'], 'lat': s[1], 'lng': s[2]})
            elif value['display_name']=='UberSUV':
                cabs_ubersuv.append({'name':value['display_name'],'surge':value['surge_multiplier'], 'lat': s[1], 'lng': s[2]})
                
    loc_dict={"uberX":cabs_uberx,"uberXL":cabs_uberxl,"UberBLACK":cabs_uberblack,"UberSUV":cabs_ubersuv}

    	#for value in val_list:
    	#	cabs.append({'name':value['display_name'],'surge':value['surge_multiplier'], 'lat': s[1], 'lng': s[2]})
    for key,val in table.scan(row_prefix='R'):
    	k=key.split("|")
    	k.pop(0)
    	table.put(key.replace('R','B'),val)
    	table.delete(key)
    return jsonify(loc_dict)
    
	



@app.route('/historicaldataanalysis')
def hist():
    return render_template('hist.html')

@app.route('/archdiagram')
def arch():
    return render_template('arch.html')

@app.route('/historicaldataprocessing')
def histdata():
	
	car_type=request.args.get('cartype', 0)
	
	hour_surge_dict={}
	pref="B"+"|"+request.args.get('startLoc', 0)+"|"+request.args.get('endLoc', 0)+"|"+request.args.get('date', 0)
	hour_list=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
	for i in hour_list:
		#prefix='B|37.776849|-122.394836|37.787808|-122.396584|2016-03-02'+' '+i
		prefix=pref+' '+i
		surge_hour="hr"+i
		surge_value=get_surge(prefix,car_type)
		
		lencalc=0
		#if len(surge_value[car_type]) > 1:
		lencalc=len(surge_value[car_type])
		#if len(surge_value[car_type])==0:
		#	surge_value[car_type].append(0)
		hour_surge_dict[surge_hour]=[i]*lencalc,surge_value[car_type]
	
	return jsonify(hour_surge_dict)
	

def get_surge(prefix,cartype):
    surge_uberx=[]
    surge_uberxl=[]
    surge_uberblack=[]
    surge_ubersuv=[]
    surge_dict={}
    
    print cartype
    conn = happybase.Connection()
    table =conn.table('uber_price_estimate')
    for key, val in table.scan(row_prefix=prefix):
        val_list= json.loads(val['uberfamily:uber_price_json'])
        for value in val_list:
            if cartype=='uberX':
                if value['surge_multiplier']>1:
                    surge_uberx.append(value['surge_multiplier'])
            elif cartype=='uberXL':
            	if value['surge_multiplier']>1:
            		surge_uberxl.append(value['surge_multiplier'])
            elif cartype=='UberBLACK':
            	if value['surge_multiplier']>1:
            		surge_uberblack.append(value['surge_multiplier'])
            elif cartype=='UberSUV':
            	if value['surge_multiplier']>1:
            		surge_ubersuv.append(value['surge_multiplier'])
                
    surge_dict={"uberX":sorted(list(set(surge_uberx))),"uberXL":sorted(list(set(surge_uberxl))),"UberBLACK":sorted(list(set(surge_uberblack))),"UberSUV":sorted(list(set(surge_ubersuv)))}
    print surge_dict
    return surge_dict




