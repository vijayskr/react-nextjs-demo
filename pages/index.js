//import { useEffect, useState } from "react";
import { MongoClient } from 'mongodb';

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg",
    address: "Some Address 10, 15 address city",
    description: "This is the first meeting!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg",
    address: "Some Address 105, 150 address city",
    description: "This is the second meeting!",
  },
];

function HomePage(props) {
  /* 
  //resolved using the static page load
  //removed the data load
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(() => {
        //Send API request
        //async task, call setLoadedMeetups, set the local data
        setLoadedMeetups(DUMMY_MEETUPS);
    }, []);
*/
  return <MeetupList meetups={props.meetups} />;
}

//This works in the pages folder
//Runs on the build process - to keep the data generated
export async function getStaticProps() {
  //Function name should be same as it is built in for NEXTJS
  //Job is to prepare the static data for this page


  const client = await MongoClient.connect('mongodb+srv://admin:admin@myatlascluster0.p0uai.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetup');

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  //Access file system, access api etc.,
  return {
    props: {
      meetups: meetups.map(meetup => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
      })),
    }, //Name is standard we need to use it as is
    revalidate: 10 // Time is in seconds !! After this time the Next JS will re-generated again, just like new request
  };
}

/* //Alternative Approach with ServerSide re-generation - Gaurenteed to run for every request
export async function getServerSideProps(context) {
    //Used for the Auth / Validation etc.,
    const req = context.req;

    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}; */

export default HomePage;
