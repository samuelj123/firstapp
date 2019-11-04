
 TSError: ⨯ Unable to compile TypeScript:
backend_1   | error TS2321: Excessive stack depth comparing types 'FindConditions<?>' and 'FindConditions<?>'.
backend_1   | src/project/project.module.ts(21,14): error TS2589: Type instantiation is excessively deep and possibly infinite.

All Front-end Components
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
