// --> /new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage () {
    const router = useRouter();

    async function addMeetupHandler (enteredMeetupData) {
        console.log(enteredMeetupData);
        
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');

    };
    return (
        <Fragment>
        <Head>
          <title>Ract Meetups</title>
          <meta name="description" content="Add your new meetups...!" />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    );
}

export default NewMeetupPage;