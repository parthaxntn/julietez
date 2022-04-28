# Store Value - Example for illustrative purposes only.

import smartpy as sp

class Blogs(sp.Contract):
    def __init__(self, params):
        self.init(
            heading = params['heading'],
            dat = params['dat'],
            tim = params['tim'],
            category = params['category'],
            content = params['content']
        )
    @sp.entry_point
    def add_blog(self, params):
        self.data.heading.push(params['heading'])
        self.data.dat.push(params['dat'])
        self.data.tim.push(params['tim'])
        self.data.category.push(params['category'])
        self.data.content.push(params['content'])

@sp.add_test(name = "Blogs")
def test():
    scenario = sp.test_scenario()


    scenario.h1("setting up..")
    contract = Blogs({
            'heading' : [],
            'dat' :[],
            'tim' :[],
            'category' :[],
            'content': []
        }
    )
    

    scenario += contract

    # scenario.h1("Adding  options...")
    # contract.add_option("yes")
    # contract.add_option("no")

    scenario.h1("Adding the blogs...")
    # contract.vote("h1","date1","t1","ca1","c1")
    # contract.vote("h2","date2","t2","ca2","c2")
    contract.add_blog({
    'heading':'h1',
    'dat':'date1',
    'tim':'tim1',
    'category':'cat1',
    'content':'con1'
    })
    contract.add_blog({
    'heading':'h2',
    'dat':'date2',
    'tim':'tim2',
    'category':'cat2',
    'content':'con2'
    })
    contract.add_blog({
    'heading':'h3',
    'dat':'date3',
    'tim':'tim3',
    'category':'cat3',
    'content':'con3'
    })
    # contract.vote("yes")

    
