import { Fragment } from "react";

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
      <MeetupDetail 
      image='https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg'
      title='Our First Meetup'
      address='Some Address'
      description='Meetup Description'
      />

  );
}
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            { params: {
                meetupId: 'm1',
                }
            },
            { params: {
                meetupId: 'm2',
                }
            }
        ]
    }
};

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    //Fetch API Data using the param


    return {
            props: {
                meetupData : {
                    id: meetupId,
                    image:'https://i.pinimg.com/originals/90/9e/38/909e38de77452bbace3cba4c1f74bc68.jpg',
                    title:'Our First Meetup',
                    address:'Some Address',
                    description:'Meetup Description',
                },
            }
    }
};

export default MeetupDetails;
