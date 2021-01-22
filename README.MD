PROJECT ONE:

Zanou: A soothing self-care journal journey.
"Zanou" in Japanese means cherry blossoms that remain in bloom even after spring has passed.
With the very best of intentions, we hope our users embrace their thoughts and find peace as they continue on the path of making Zanou their own safe sanctuary.  

USER STORIES:

-User navigates to homepage of site
-If user is new, user will select “Create a Journal” from the drop down menu
-“Create a new journal” selection will redirect user to “create new account” page
-User will enter a nickname, email, password, and confirm password.
-User selects “create account” button, and is then redirected to the login page
-If user has account or has just created new account, they will be directed to login page
-User will enter the email they signed up with and password corresponding to said email
-If all entries match database, they will be redirected to their profile page and a session will begin
-Profile page will include list of existing entries (if any) which can be selected for viewing/editing/deleting
-At the bottom of the page in nav bar, there is an "Add a new entry” button
-If user selects “add a new entry” they will be redirected to a create page which contains an title field which defaults to the date of creation, and an empty text area with an integreated rich text editor which contains features such as (but not limited to) font customization, media uploads, and emoji selections
-Once entry is complete, user selects the “submit journal entry” button
-User is redirected to their profile page with new entry submission pinned to the list of existing entries
-If user selects existing entry, they are redirected to the show page for that entry and will have buttons for editing or deleting entry at the bottom
-If user selects “edit entry” they will be redirected to the edit page, which will contain existing entry data but in a the rich text editor textarea that can be edited
-Once existing entry is edited, they will select “update entry” button and be redirected to their profile page
-If existing entry is deleted, they will be redirected to their profile page also
-A log out option is also available in the nav bar drop menu which if selected will discontinue the user's session and redirect them to the homepage
-A delete account option is also available in the nav bar which if selected, will prompt an 'ok' or 'cancel' window which will cancel the delete function if cancel is selected, or purge the user's account of all data including existing entries, end the session, and redirect them to the homepage

Zanou was built using HTML, CSS, Bootstrap, JavaScript, Express, Node, Mongoose, and MongoDB
Zanou is deployed using Heroku and Atlas

Features we hope to add in the future include: error messages in the sign up and log in forms for users


*WIREFRAMES*
![wireframe](https://i.imgur.com/nVGjg2D.png)
