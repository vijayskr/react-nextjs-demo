//import { Fragment } from "react";
import { Fragment } from 'react';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name="description" content={props.meetupData.description}/>
    </Head>
      <MeetupDetail 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      /* image='https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg'
      title='Our First Meetup'
      address='Some Address'
      description='Meetup Description' */
      />
      </Fragment>
  );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://admin:admin@myatlascluster0.p0uai.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetup');
    const meetups = await meetupsCollection.find(
        {}, //Filter Choice - empty will mention as ALL objects
        {_id: 1} // empty will return all the fields - we specified ID so only one colum is returned
        ).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({params: {meetupId: meetup._id.toString()},
                })),
        
            }
        };
        
        /* Hardecoded Paths - for understanding was added earlier, now modified to dynamic paths...
        [
            { params: {
                meetupId: 'm1',
                }
            },
            { params: {
                meetupId: 'm2',
                }
            }
        ] */
        
export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    //Fetch API Data using the param
    const client = await MongoClient.connect('mongodb+srv://admin:admin@myatlascluster0.p0uai.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetup');
    const meetups = await meetupsCollection.findOne({_id: ObjectId(meetupId) });

    client.close();

    return {
            props: {
                meetupData : {
                    id:meetups._id.toString(),
                    title:meetups.title,
                    image:meetups.image,
                    address:meetups.address,
                    description:meetups.description,
                },
            },
        }
    };
    
    export default MeetupDetails;
    
    /* {
        id: meetupId,
        image:'https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg',
        title:'Our First Meetup',
        address:'Some Address',
        description:'Meetup Description',
    }, */