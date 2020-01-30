# First Tasks
	* Make sure Migration works
	* Make all cosmetic Changes
		* ActiveProj Make over-due Tasks Red
		* Dashboard-CEO Profile of Projects with completed/incomplete tasks
		* Dashboard-CEO Profile of Staff with their upcoming tasks
		* PGComponent Don't allow to submit without 'Needs'
		* PgsComponent Connect Projects to People Groups, not needs
  	* PgComponent Change 'Submit' Button to 'Save' 
		* PgComponent Add Media Accessibility <Radio, TV, Media players, SW/Radio>
		* PgComponent Add % to access to electricity, education, etc.
		* PgComponent Add 'Both' in 'Urban'/'Rural'/'Unknown'
		* PgComponent Average Annual Income 
		* PgComponent Avoid Creating Duplicates 
		* PgComponent Change Everything to USD
		* PgComponent Put Needs in Text-Area
		* PgComponent Put a text-area for "Needs"
		* PgComponent Remove Unknown
		* pf1intro Add a Launch Date 
		* pf2-pf4 All KPIs -> KPIs don't list in order after saving (Delete from DB on command)
		* pf2contentcreation 6 month review - Next 6 months changes in format
		* pf2contentcreation Add Content Format Description
		* pf2contentcreation Add Minutes in duration
		* pf2contentcreation Add a Schedule "Daily/Weekly/Monthly"
		* pf2contentcreation add content-description in text-area instead of text-box
		* pf3contentdelivery Add 'App' to Distributon Drop-down
		* pf3contentdelivery Make First Drop-Down 'Default'
		* pf3contentdelivery Put KPI in Second Column (if Possible)
		* pf3contentdelivery Save as Draft Button Not working
		* pf4Marketing Make the List more user-friendly
		* pf6fundraising Add drop-down for fund-raising method 
		* pf6fundraising Change Everything to USD
		* pf6fundraising Next-button Not working
		* pf6fundraising say 'Committed' not 'planned'
		* pf7tasks Hardcode the Last task
		* pf7tasks Put dates instead of 'days' for tasks
		* pf9budget Budget areas include 'Content Creation', 'Content Distribution', 'Marketing', 'Audience Relations', 'Reporting', 'Staff', 'FundRaising'
		* pf9budget Change Everything to USD
		* proposalnav Change the mouse-pointer to 'finger'
		* proposalnav Highlight the place where you have reached
		* viewproj fix the tables that are sticking out
	* Make the entity-changes according to the cosmetic changes and connect apis
	* Make all Entity edits until api. 
	* Write unit-tests
	* Write a Manual for the App < Consultant Hat> 
# To Be Done Later

  * Clean up the API (Make more sensible paths and names)
  * Document the API properly 
	* Bring Emails to the workflow
	* Add Monthly Listeners to Dashboard

# Dashboard
  * Number of Projects vs Active Projects
  * Number of Staff and the amount of tasks for each staff
  * Number of People Groups Set up 
  * Number of Needs per people group
  * Number of Projects used per people group



<!---
* Identify UI Components
    ! Login/Register #LoginComponent #RegisterComponent
    * National Strategy
        * People Groups #PGComponent #PGsComponent #AddPGComponent
        * Needs for People Group
    * Projects #ProjsComponent #ProjComponent #AddProj1Component #AddProj2Component #AddProj3Component #AddProj4Component #AddProj5Component
        * Proposal Drafts (For CEOs)
        * Sent Drafts (For CEOs)
        * Approved Projects (For CEOs)
        * Projects to be approved (For Singapore)
        * Approved Projects (For Singapore)
        * Add New Project (Button For CEOs)
    * AddProj1 Overview AddProj1Component
        * Language Drop-Down (Based on Region of ID)
        * Needs Drop-Down (Based on Language Selected)
        * Name of Project, Mision and Vision of Project (text-area)
        * Submit (button)
    * AddProj2 The four Walls 
        * Program Name, Duration, Schedule(not necessary), Content Format (text), Production Format (Audio / Video Radio Buttons)
        * KPI 
        * Primary Distribution Method (Radio, Digital, Analogue)
        * Secondary Distribution Method ('')
        * Tertiary Distribution Method ('')

    * AddProj3 Tasks
        * 
        * If Audio
        * If Video
    * Add Proj4 Budget

* Chart Out Front-end logic 
* Chart Out Schema
    * Projects
        * Name: string
        * Mission: string
        * Vision: string
        * ProgramName: string
        * Duration: date
        * DistributionMethods
        * Schedule: string
        * ContentFormat: string
        * ProductionFormat: [audio, video]
        * contentdevkpi: []
        * contentdiskpi: []
        * marketingkpi: []
        * audiencerelkpi: []
    * Needs
    * Languages
    * People/Language Groups
    * Objectives
    * Tasks
* Identify Back-end Components
* Chart Out Back-end logic








## Stage 2 - Task Management
### List of Tasks
* Interact with all CEO's and Directors to understand their workflow, and their need of this module; Understand their work-style, computer literacy, and availability for the feasibility of Task-Management Module (2 weeks: 10 June)
* Code Task Management Module and view components for Manager, CEO, ID and Donor (3 weeks: 1 July)
* Task Management Module Beta Stage (2 weeks: 15 July)
* Task Management Module Release (15 July)

## Stage 3 - Audience Relations Service
### List of Tasks
* Connect Google-sheet Data to Firebase Data (3 Days: 18 July)
* Research on Report format needs in different countries and AMS. (1 Week: 25 July)
* Make components for Response entry (3 Days: 29 July)
* Make Components for Response Reading by different levels (4 Days: 2 August)
* Make components for Radio Home Management (1 week: 9 August)
* Make Report formats and Release Beta (4 Days: 15 August
* Beta stage (2 Weeks: 29 August)
* Audience Relations Module Release (29 August)

## Stage 4 - Human Resources 
### List of Tasks
* Get Feedback from CEOs and Managers (2 weeks: 12 September)
* Build View Components (1 Week: 19 September)
* Beta Stage (2 Weeks 3 October)
* Human Resources Module Release (3 October)

## Stage 5 - Production Service
### List of Tasks
* Research and prepare Data-base schema (3 weeks: 24 October)
* Build components (2 weeks 7 November)
* Beta Stage (2 weeks 21 November)
* Production Service Module Release (21 November)

## Stage 6 - Local Donor Management
### List of Tasks
* Research and prepare Donor Management schema (2 weeks: 12 December)
* Build components (3 weeks: 20 Jan)
* Beta Stage (2 weeks: 3 Feb)
* Production Service Module Release 3 Feb



## Feature Requests
* Allow people to drag-drop objectives and tasks up and down to re-order them 


## User Component
* Make sure the component re-loads when DELETE is done 
* Give a PUT somewhere in the user-component
-->
h
