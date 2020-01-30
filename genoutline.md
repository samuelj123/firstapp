## New MVP Idea
### Page 1 - Mission, Vision, Name, Language,and Needs
* Log in with ID, be given a set of languages for his ID
* Decide the Language
* Connect to the Needs that come with that language
* Write the Name of the Project (Different from Program Name, if necessary)
* Write Mission and Vision for the Project. 

### Page 2 - Content Creation, Distribution, Marketing, Audience Relations
* Content Creation
    * Program Name, 
    * Duration, 
    * Schedule (if any), 
    * Content Format, 
    * Production Format (Options for Audio and Video).
        * (describe Content format and Production Format)
    * KPI For Content Creation (Text-boxes to be filled)
* Content Distribution
    * Primary Distribution Method 
        * Radio: Radio Button [FM, MW, SW],
        * Digital: [Youtube, Facebook, InstantMessaging(like whatsapp), IVR, Website, 360],
        * Analog: [SD Card, Radio Homes, Media Players, CD's, other]
        * KPI: <With Option to add more KPI>
    * Secondary Distribution Method
        { Same as above}
    * Tertiary Distribution Method (Optional)
        { Same as above}
* Marketing 
    * Types of Marketing
        * Print:
            * Flyers: {Number of}
            * Posters: {Number of}
            * News-paper Ads: {String}
        * Events:
            * Church Visit : {Number of} {in x months}
            * Public Meeting: {Number of} {in x months}
        * Digital:
            * Facebook Ads
            * Google Ads
        * Cross-Promotion:
            * Radio: 
                * (On other programs) {Which Program we're promoting this on},
            * On TWR Website
* Audience Relations
    * Telephone Responses
    * House Visits
    * Event Follow-up
    * Letter Responses
    * Emails

### Page 3 - Tasks (Put Partners)
* Content-Creation
   - Audio Task-List 
        * Identifying: 
            * Writer/Translator
            * Voices/Actors
            * Crew/Producers
            * Studio
        * Pilot and Pilot Testing, 
        * Production
            * Write/Translate, Recording, 
        * Post-Production 
            * Compiling/Editing, 
        * Uploading
   - Video Task-List 
        * Identifying: 
            * Writer/Translator, Actors, Crew, Studio
        * Pilot and Pilot Testing, 
        * Production
            * Write/Translate, Production,
        * Post-Production
            * Post-Production
        * Uploading

* Task Name, Person Responsible, Dead-line, Partner-if-involved <b>Add more tasks</b>

* Content-Distribution
    * If Distribution Method = Radio [Upload to LDMS] 
    * If Distribution Method = FM[Upload to FTP/CD] 
    * If Distribution Method = Digital: [Enter Metadata Upload to Media]
    * If Distribution Method = Analague: [Copy to SD Card]
* Marketing
* Audience Relations 

### Page 4 - Budget (Put Fund-raising)
* For Each Task, a new budget row that contains
    * Particulars
    * Cost
* At the end, option for self-fund-raising, and a percentage input box.
* Fund-Raising 
    * Method of Fund Raising
    * Deadline for receiving funds. 


All Front-end Methods
===============
# LoginComponent
# RegisterComponent
# PGComponent
* GetUser(:userid){}
* GetPG(:pgid){}
* DeletePG(:pgid){}
# PGsComponent
* GetUser(:userid){}
* GetPGs(lim > :userid.region, searchable to pg.pgname, lang, ){}
* DeletePG(:pgid){}
* AddPG(){createpgid(){}}
# AddPGComponent
* GetUser(:userid){}
* Form
*   type Language/language code (limited to lang[:userid.region]), 
*   People Group Name (prefill/add-new) "pg.pgname"
*   Multiple lines, for Need of PeopleGroup "pg.need[]"
* EditPG(:pgid){}
* DeletePG(:pgid){alert('You Really Want to Delete? ' + pg.pgname + ' ?')}
# ProjectsComponent
* GetUser(:userid){}
* GetProjects(){}
* AddProject(){}
* EditProject(:projid){}
* DeleteProject(:projid){}
* link(ProjectComponent)
# AddProj1Component
* GetUser(:userid){}
* CreateProjid(){}.
### Form
        Select Language from Language.filter(userid.region[]) 
        Select Needs from Selected Language
        Text Name of Project proj(:projid).name  :string
        Text Vision of Project proj(:projid).vision :string
        Text Mission of Project proj(:projid).mission :string
        EditProj(:projid){} [on Submit]
#AddProj2Component
## Content Creation
*   Program Name proj(:projid).prog.name :string
*   Duration proj(:projid).prog.duration :[hours: number, min: number, secs: number]
*   Schedule proj(:projid).prog.schedule :[boolean * 7]
*   Content Format proj(:projid).prog.cformat :string
*   Production Format proj(:projid).prog.pformat :enum[audio, video]
*   KPI for content Creation proj(:projid).contentkpi :[string]
## Content Distribution (Repeat thrice)
### Primary Distribution Method
*   Radio Button Distribution Method  :enum[Radio, Digital, Analogue]
*   If Radio, open form 
    *   Radio Button Radio Dist Method. proj(:projid).primarydm. :enum[FM, MW, SW] :string
*   If Digital open form
    *   Checkboxes [Youtube, Facebook, InstantMessaging, IVR, TWR 360, Local Website] proj(:projid).primarydm :string
*   If Analogue open form
    *   Checkboxes [SD Card, Radio Homes, Media Players, CD's]
    *   Other :text proj(:projid).primarydm :string
### Secondary Dist Method
*   Radio Button Distribution Method  :enum[Radio, Digital, Analogue]
*   If Radio, open form 
    *   Radio Button Radio Dist Method. proj(:projid).primarydm. :enum[FM, MW, SW] :string
*   If Digital open form
    *   Checkboxes [Youtube, Facebook, InstantMessaging, IVR, TWR 360, Local Website] proj(:projid).primarydm :string
*   If Analogue open form
    *   Checkboxes [SD Card, Radio Homes, Media Players, CD's]
    *   Other :text proj(:projid).primarydm :string
### Tertiary Dist Method (not mandatory)
*   Radio Button Distribution Method  :enum[Radio, Digital, Analogue]
*   If Radio, open form 
    *   Radio Button Radio Dist Method. proj(:projid).primarydm. :enum[FM, MW, SW] :string
*   If Digital open form
    *   Checkboxes [Youtube, Facebook, InstantMessaging, IVR, TWR 360, Local Website] proj(:projid).primarydm :string
*   If Analogue open form
    *   Checkboxes [SD Card, Radio Homes, Media Players, CD's]
    *   Other :text proj(:projid).primarydm :string
## Marketing
*   Nature of Marketing Checkbox [Print, Events, Digital Cross-Promotion]
*   Print Checkbox [Flyers, Posters, News-paper-ads]
*   Events [Church Visits, Public Meetings]
*   Digital [Facebook Ads, Google Ads]
*   Cross-Promotion [Radio, On TWR Website] proj.marketing: MarketingObject{}
## Audience Relations
* KPIs
*   Telephone Responses
*   House Visits
*   Event Follow-up
*   Letter Responses
*   Emails

EditProj(:projid){} [on Submit]

# AddProj3Component (Tasks)
## Content Creation
## Content Distribution
## Marketing
## Audience Relations 
# AddProj4Component
# ProjectComponent