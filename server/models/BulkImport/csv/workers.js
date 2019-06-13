const BUDI = require('../BUDI').BUDI;
const moment = require('moment');

class Worker {
  constructor(currentLine, lineNumber) {
    this._currentLine = currentLine;
    this._lineNumber = lineNumber;
    this._validationErrors = [];
    this._contractType= null;

    this._localId = null;
    this._workerLocalID = null;
    this._changeUniqueWorkerId = null;

    this._NINumber = null;
    this._postCode = null;
    this._DOB = null;
    this._gender = null;

    this._contractType = null;

    this._ethnicity = null;
    this._britishNationality = null;
    this._yearOfEntry = null;

    this._disabled = null;
    this._careCertDate = null;
    this._careCert = null;

    this._recSource = null;
    this._startDate = null;
    this._startInsect = null;

    this._apprentice = null;
    this._fullTime = null;
    this._zeroHourContract = null;

    this._daysSick = null;

    this._salaryInt = null;
    this._salary = null;
    this._hourlyRate = null;

    this._mainJobRole = null;
    this._mainJobDesc = null;

    this._contHours = null;
    this._addlHours = null;

    this._otherJobs = null;
    this._otherJobsOther = null;

    this._registeredNurse = null;
    this._nursingSpecialist = null;

    this._nationality = null;
    this._countryOfBirth = null;

    this._socialCareQualification = null;
    this._socialCareQualificationlevel = null;
    this._nonSocialCareQualification = null;
    this._nonSocialCareQualificationlevel = null;

    // array of qualification records for this worker
    this._qualifications = null;
  };

  //49 csv columns
  static get LOCAL_ID_ERROR() { return 1010; }
  static get UNIQUE_WORKER_ID_ERROR() { return 1020; }
  static get CHANGE_UNIQUE_WORKER_ID_ERROR() { return 1030; }
  static get STATUS_ERROR() { return 1040; }
  static get DISPLAY_ID_ERROR() { return 1050; }
  static get NINUMBER_ERROR() { return 1060; }
  static get POSTCODE_ERROR() { return 1070; }
  static get DOB_ERROR() { return 1080; }
  static get GENDER_ERROR() { return 1090; }
  static get ETHNICITY_ERROR() { return 2000; }
  static get NATIONALITY_ERROR() { return 2010; }
  static get BRTITISH_CITIZENSHIP_ERROR() { return 2020; }
  static get COUNTRY_OF_BIRTH_ERROR() { return 2030; }
  static get YEAR_OF_ENTRY_ERROR() { return 2040; }
  static get DISABLED_ERROR() { return 2050; }
  static get INDSTATUS_ERROR() { return 2060; }
  static get INDDATE_ERROR() { return 2070; }
  static get CARE_CERT_ERROR() { return 2080; }
  static get CARE_CERT_DATE_ERROR() { return 2090; }
  static get RECSOURCE_ERROR() { return 3000; }
  static get START_DATE_ERROR() { return 3010; }
  static get START_INSECT_ERROR() { return 3020; }
  static get APPRENCTICE_ERROR() { return 3030; }
  static get CONTRACT_TYPE_ERROR() { return 3040; } //EMPL STATUS
  static get FULLTIME_ERROR() { return 3050; }
  static get ZERO_HRCONT_ERROR() { return 3060; }
  static get DAYSICK_ERROR() { return 3070; }
  static get SALARY_INT_ERROR() { return 3080; }
  static get SALARY_ERROR() { return 3090; }
  static get HOURLY_RATE_ERROR() { return 4000; }
  static get MAIN_JOB_ROLE_ERROR() { return 4010; }
  static get MAIN_JOB_DESC_ERROR() { return 4020; }
  static get CONT_HOURS_ERROR() { return 4030; }
  static get ADDL_HOURS_ERROR() { return 4040; }
  static get OTHER_JOB_ROLE_ERROR() { return 4050; }
  static get OTHER_JR_DESC_ERROR() { return 4060; }
  static get NMCREG_ERROR() { return 4070; }
  static get NURSE_SPEC_ERROR() { return 4080; }

  static get SOCIALCARE_QUAL_ERROR() { return 4090; }
  static get NON_SOCIALCARE_QUAL_ERROR() { return 5000; }


  static get NO_QUAL_WT_ERROR() { return 5010; }
  static get QUAL_WT_ERROR() { return 5020; }
  static get QUAL_WT_NOTES_ERROR() { return 5030; }
  static get QUAL_ACH_ERROR() { return 5035; }
  static get QUAL_ACH01_ERROR() { return 5040; }
  static get QUAL_ACH01_NOTES_ERROR() { return 5050; }
  static get QUAL_ACH02_ERROR() { return 5060; }
  static get QUAL_ACH02_NOTES_ERROR() { return 5070; }
  static get QUAL_ACH03_ERROR() { return 5080; }
  static get QUAL_ACH03_NOTES_ERROR() { return 5090; }

  get lineNumber() {
    return this._lineNumber;
  }

  get currentLine() {
    return this._currentLine;
  }
      
  get local() {
    return this._localId;
  }
  get uniqueWorker() {
    return this._uniqueWorkerId;
  }
  get changeUniqueWorker() {
    return this._changeUniqueWorkerId;
  }
  get contractType() {
    return this._contractType;
  }
  get status() {
    return this._status;
  }
  get dislpayID() {
    return this._displayId;
  }
  get niNumber() {
    return this._NINumber;
  }
  get postCode() {
    return this._postCode;
  }
  get DOB() {
    return this._DOB;
  }
  get gender() {
    return this._gender;
  }
  get ethnicity() {
    return this._ethnicity;
  }
  get britishNationality() {
    return this._britishNationality;
  }
  get yearOfEntry() {
    return this._yearOfEntry;
  }
  get disabled() {
    return this._disabled;
  }
  get indStatus() {
    return this._indStatus;
  }
  get indDate() {
    return this._indDate;
  }
  get careCert() {
    return this._careCert;
  }
  get careCertDate() {
    return this._careCertDate;
  }
  get recSource() {
    return this._recSource;
  }
  get startDate() {
    return this._startDate;
  }
  get startInsect() {
    return this._startInsect;
  }
  get apprentice() {
    return this._apprentice;
  }
  get fullTime() {
    return this._fullTime;
  }
  get zeroHourContract() {
    return this._zeroHourContract;
  }
  get daysSick() {
    return this._daysSick;
  }
  get salaryInt() {
    return this._salaryInt;
  }
  get salary() {
    return this._salary;
  }
  get hourlyRate() {
    return this._hourlyRate;
  }
  get mainJobRole() {
    return this._mainJobRole;
  }
  get mainJobDesc() {
    return this._mainJobDesc;
  }
  get contHours() {
    return this._contHours;
  }

  _validateContractType() {
    const myContractType = parseInt(this._currentLine.EMPLSTATUS);

    //console.log("NM DEBUG: contract type (employment status): ", myContractType)
    if (Number.isNaN(myContractType)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.CONTRACT_TYPE_ERROR,
        errType: 'CONTRACT_TYPE_ERROR',
        error: "Employment Status (EMPLSTATUS) must be an integer",
        source: this._currentLine.EMPLSTATUS,
      });
      return false;
    } else {
      this._contractType = myContractType;
      return true;
    }
  }

  _validateLocalId() {
    const myLocalId = this._currentLine.LOCALESTID;

    // must be present and n more than 50 characters
    const MAX_LENGTH = 50;

    if (!myLocalId || myLocalId.length == 0) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.LOCAL_ID_ERROR,
        errType: `LOCAL_ID_ERROR`,
        error: "Local Identifier must be defined",
        source: this._currentLine.LOCALESTID,
      });
      return false;
    } else if (myLocalId.length >= MAX_LENGTH) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.LOCAL_ID_ERROR,
        errType: `LOCAL_ID_ERROR`,
        error: `Local Identifier (LOCALESTID) must be no more than ${MAX_LENGTH} characters`,
        source: this._currentLine.LOCALESTID,
      });
      return false;
    } else {
      this._localId = myLocalId;
      return true;
    }

  }

  _validateUniqueWorkerId() {
    const myUniqueWorkerId = this._currentLine.UNIQUEWORKERID;

    // must be present and n more than 50 characters
    const MAX_LENGTH = 50;

    if (!myUniqueWorkerId || myUniqueWorkerId.length == 0) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.UNIQUE_WORKER_ID_ERROR,
        errType: `UNIQUE_WORKER_ID_ERROR`,
        error: "Unique Worker Local Identifier must be defined",
        source: this._currentLine.UNIQUEWORKERID,
      });
      return false;
    } else if (myUniqueWorkerId.length >= MAX_LENGTH) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.UNIQUE_WORKER_ID_ERROR,
        errType: `UNIQUE_WORKER_ID_ERROR`,
        error: `Unique Worker Identifier (UNIQUEWORKERID) must be no more than ${MAX_LENGTH} characters`,
        source: this._currentLine.UNIQUEWORKERID,
      });
      return false;
    } else {
      this._uniqueWorkerId = myUniqueWorkerId;
      return true;
    }
  }

  //Comment: This may not be supported in UI/system so only checked lenght if exists, could be null
  _validateChangeUniqueWorkerId() {
    const myChangeUniqueWorkerId = this._currentLine.CHGUNIQUEWRKID;
    const MAX_LENGTH = 50;
    if (myChangeUniqueWorkerId.length >= MAX_LENGTH) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.CHANGE_UNIQUE_WORKER_ID_ERROR,
        errType: `CHANGE_UNIQUE_WORKER_ID_ERROR`,
        error: `Change Unique Local Worker Identifier (CHGUNIQUEWRKID) must be no more than ${MAX_LENGTH} characters`,
        source: this._currentLine.CHGUNIQUEWRKID,
      });
      return false;
    } else {
      this._changeUniqueWorkerId = myChangeUniqueWorkerId;
      return true;
    }
  }
    
  _validateStatus() {
    const statusValues = ['DELETE', 'UPDATE', 'UNCHECKED', 'NOCHANGE', 'NEW','CHGSUB'];
    const myStatus = this._currentLine.STATUS ? this._currentLine.STATUS.toUpperCase() : this._currentLine.STATUS;

    // must be present and must be one of the preset values (case insensitive)
    if (!statusValues.includes(myStatus)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.STATUS_ERROR,
        errType: `STATUS_ERROR`,
        error: `Status (STATUS) must be one of: ${statusValues}`,
        source: this._currentLine.STATUS,
      });
      return false;
    } else {
      this._status = myStatus;
      return true;
    }
  }

  _validateDisplayId() {
    const myDisplayId = this._currentLine.DISPLAYID;
    const MAX_LENGTH = 120;

    if (myDisplayId.length >= MAX_LENGTH) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.DISPLAY_ID_ERROR,
        errType: `WORKER_DISPLAY_ID_ERROR`,
        error: `Display ID (DISPLAYID) must be no more than ${MAX_LENGTH} characters`,
        source: this._currentLine.DISPLAYID,
      });
      return false;
    } else {
      this._displayId = myDisplayId;
      return true;
    }
  }

  _validateNINumber() {
    const myNINumber = this._currentLine.NINUMBER;
    const LENGTH = 9;
    const niRegex = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/;

    if (myNINumber.length > 0) {
      if  (myNINumber.length != LENGTH  ) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NINUMBER_ERROR,
          errType: `WORKER_NINUMBER_ERROR`,
          error: `National Insurance number (NINUMBER) must be ${LENGTH} characters`,
          source: this._currentLine.NINUMBER,
        });
        return false;
      } else if (myNINumber.length > 0 && myNINumber.length == LENGTH && !niRegex.test(myNINumber)) {
  
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NINUMBER_ERROR,
          errType: `WORKER_NINUMBER_ERROR`,
          error: `Incorret NI format; must be in AB123456C format`,
          source: this._currentLine.NINUMBER,
        });
        return false;
      }
      else {
        this._NINumber = myNINumber;
        return true;
      }
    }
  }

  _validatePostCode() {
    const myPostcode = this._currentLine.POSTCODE;
    const MAX_LENGTH = 10;
    const postcodeRegex = /^[A-Za-z]{1,2}[0-9]{1,2}\s{1}[0-9][A-Za-z]{2}$/;

    if (myPostcode.length) {
      if (myPostcode.length >= MAX_LENGTH) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.LOCAL_ID_ERROR,
          errType: `POSTCODE_ERROR`,
          error: `POSTCODE (POSTCODE) must be no more than ${MAX_LENGTH} characters`,
          source: this._currentLine.POSTCODE,
        });
        return false;
      } else if (myPostcode.length >= MAX_LENGTH && !postcodeRegex.test(myPostcode)) {
         this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.POSTCODE_ERROR,
          errType: `POSTCODE ERROR`,
          error: `Postcode (POSTCODE) unexpected format`,
          source: myPostcode,
        });
        return false;
      } else {
        this._postCode = myPostcode;
        return true;
      }      
    }
  }
  
  _validateDOB() {
    const myDOB = this._currentLine.DOB;

    if (myDOB.length > 0) {
      const dobRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
      const myDobRealDate = moment.utc(myDOB, "DD/MM/YYYY");
  
      if (!myDobRealDate.isValid()) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.DOB_ERROR,
          errType: `DOB_ERROR`,
          error: `Date of birth (DOB) Incorrect`,
          source: this._currentLine.DOB,
        });
        return false;
  
      } else if (myDOB.length > 0 && dobRegex.test(myDOB)) {
  
        const MIN_AGE = 14;
        const MAX_AGE = 100;
        const MIN_DATE = moment().subtract(MIN_AGE, 'years');
        const MAX_DATE = moment().subtract(MAX_AGE, 'years');
  
        if (MIN_DATE.isBefore(myDobRealDate, 'year') || MAX_DATE.isAfter(myDobRealDate, 'year')) {
  
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.DOB_ERROR,
            errType: `DOB_ERROR`,
            error: `Date of birth (DOB) Must be between ${MIN_AGE} to ${MAX_AGE} years`,
            source: this._currentLine.DOB,
          });
          return false;
        }
  
        this._DOB = myDobRealDate;
        return true;
      } else {
        this._DOB = myDobRealDate;
        return true;
      }
    }
  }

  _validateGender() {
    const genderValues = [1,2,3]; //[MALE=1, FEMALE=2, UNKNOWN=3];
    const myGender = parseInt(this._currentLine.GENDER);

    if (this._currentLine.GENDER.length > 0) {
      if (isNaN(myGender)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.GENDER_ERROR,
          errType: 'GENDER_ERROR',
          error: "GENDER (GENDER) must be an integer",
          source: this._currentLine.GENDER,
        });
        return false;
      } else if (!genderValues.includes(parseInt(myGender))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.GENDER_ERROR,
          errType: 'GENDER_ERROR',
          error: "GENDER (GENDER) must have value 1 (MALE) or 2(FEMALE) or 3(UNKNOWN)",
          source: this._currentLine.GENDER,
        });
        return false;
      }
      else {
        switch (myGender) {
          case 1:
            this._gender = 'Male';
            break;
          case 2:
            this._gender = 'Female';
              break;
          case 3:
            this._gender = 'Don\'t know';
            break;
        }
        return true;
      }
    }
  }

  //Mandatory for local Authority - need to check this conditional check
  _validateEthnicity() {
    const ethnicityValues = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 98, 99];
    const myEthnicity = parseInt(this._currentLine.ETHNICITY);

    // optional
    if (this._currentLine.ETHNICITY && this._currentLine.ETHNICITY.length > 0) {
      if (isNaN(myEthnicity)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ETHNICITY_ERROR,
          errType: 'ETHNICITY_ERROR',
          error: "Ethnicity (ETHNICITY) must be an integer",
          source: this._currentLine.ETHNICITY,
        });
        return false;
      } else if (!ethnicityValues.includes(myEthnicity)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ETHNICITY_ERROR,
          errType: 'ETHNICITY_ERROR',
          error: "Ethnicity (ETHNICITY) must have value between 31 to 47,  98 or 99",
          source: this._currentLine.ETHNICITY,
        });
        return false;
      }
      else {
        this._ethnicity = myEthnicity;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateCitizenShip() {
    const BritishCitizenshipValues = [1,2,999];
    const myBritishCitizenship = parseInt(this._currentLine.BRITISHCITIZENSHIP);

    // optional
    if (this._currentLine.BRITISHCITIZENSHIP && this._currentLine.BRITISHCITIZENSHIP.length > 0) {
      if (isNaN(myBritishCitizenship)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.BRTITISH_CITIZENSHIP_ERROR,
          errType: 'BRTITISH_CITIZENSHIP_ERROR',
          error: "CitizenShip (BRITISHCITIZENSHIP) must be an integer",
          source: this._currentLine.BRITISHCITIZENSHIP,
        });
        return false;
      } else if (!BritishCitizenshipValues.includes(parseInt(myBritishCitizenship))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.BRITISHCITIZENSHIP_ERROR,
          errType: 'BRTITISH_CITIZENSHIP_ERROR',
          error: "British Citizenship (BRITISHCITIZENSHIP) must have value 1(Yes) to 2(No),  999(Unknown) ",
          source: this._currentLine.BRITISHCITIZENSHIP,
        });
        return false;
      }
      else {
        switch (myBritishCitizenship) {
          case 1:
            this._britishNationality = 'Yes';
            break;
          case 2:
            this._britishNationality = 'No';
            break;
          case 999:
            this._britishNationality = 'Don\'t know';
            break;
        }
        return true;
      }
    } else {
      return true;
    }
  }

  // this should 4 digit and less than date of birth;
  // ignore countr of birth check
  _validateYearOfEntry() {
    const myYearOfEntry = this._currentLine.YEAROFENTRY;
    const yearRegex = /^\d{4}$/;

    if (myYearOfEntry && !yearRegex.test(myYearOfEntry)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.YEAROFENTRY_ERROR,
        errType: 'Ethnicity_ERROR',
        error: "YEAR OF ENTRY (YEAROFENTRY) must be 4 number ",
        source: this._currentLine.YEAROFENTRY,
      });
      return false;
    } else {
      this._yearOfEntry = parseInt(myYearOfEntry, 10);
      return true;
    }
  }

  _validateDisabled() {
    const disabledValues = [0,1]; 
    const myDisabled = parseInt(this._currentLine.DISABLED, 10);

    // optional
    if (this._currentLine.DISABLED && this._currentLine.DISABLED.length > 0) {
      if (isNaN(myDisabled)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.DISABLED_ERROR,
          errType: 'DISABLED_ERROR',
          error: "Disabled (DISABLED) must be an integer",
          source: this._currentLine.DISABLED,
        });
        return false;
      } else if (!disabledValues.includes(parseInt(myDisabled))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.DISABLED_ERROR,
          errType: 'DISABLED_ERROR',
          error: "Disabled (DISABLED) must have value 0(No Disability) or 1(Has Disability)",
          source: this._currentLine.DISABLED,
        });
        return false;
      }
      else {
        switch (myDisabled) {
          case 1:
            this._disabled = 'Yes';
            break;
          case 0:
            this._disabled = 'No';
            break;
        }
        return true;
      }
    } else {
      return true;
    }
  }

  _validateIndStatus() {
    const indStatusValues = [1,3];
    const myIndStatus = this._currentLine.INDSTATUS;

    if (myIndStatus && isNaN(myIndStatus)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.INDSTATUS_ERROR,
        errType: 'INDSTATUS_ERROR',
        error: "IndStatus (INDSTATUS) must be an integer",
        source: this._currentLine.INDSTATUS,
      });
      return false;
    } else if (myIndStatus && !indStatusValues.includes(parseInt(myIndStatus))) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.INDSTATUS_ERROR,
        errType: 'INDSTATUS_ERROR',
        error: "IndStatus (INDSTATUS) must have value 1(induction complete) or 3(not applicable)",
        source: this._currentLine.INDSTATUS,
      });
      return false;
    }
    else {
      this._indStatus = myIndStatus;
      return true;
    }

  }

  //date can not be in future,
  //Question: only answer or if above is provided
  _validateIndDate() {
    const myIndDate = this._currentLine.INDDATE;
    const myIndStatus = this._currentLine.INDSTATUS;

    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    var d1 = new Date();
    var d2 = new Date(myIndDate);

    if (myIndDate && !dateRegex.test(myIndDate)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.INDDATE_ERROR,
        errType: 'INDSTATUS_ERROR',
        error: "IndDate (INDDATE) should by in dd/mm/yyyy format",
        source: this._currentLine.INDDATE,
      });
      return false;
    } else if ((d2 > d1)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.INDDATE_ERROR,
        errType: 'INDSTATUS_ERROR',
        error: "Date can not be in future",
        source: this._currentLine.INDDATE,
      });
      return false;
    } else {
      this._indDate = myIndDate;
      return true;
    }
  }

  _validateCareCert() {
    const careCertValues = [1, 2, 3];
    const myCareCert = parseInt(this._currentLine.CARECERT);

    if (this._currentLine.CARECERT && this._currentLine.CARECERT.length > 0) {
      if (isNaN(myCareCert)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CARE_CERT_ERROR,
          errType: 'CARECERT_ERROR',
          error: "Care Certificate (CARECERT) must be an integer",
          source: this._currentLine.CARECERT,
        });
        return false;
      } else if (!careCertValues.includes(parseInt(myCareCert))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CARE_CERT_ERROR,
          errType: 'CARECERT_ERROR',
          error: "Care Certificate (CARECERT) must have value 1(YES) or 2(NO) or 3(IN PROGRESS)",
          source: this._currentLine.CARECERT,
        });
        return false;
      }
      else {
        switch (myCareCert) {
          case 1:
            this._careCert = 'Yes, completed';
            break;
          case 2:
            this._careCert = 'No';
            break;
          case 3:
            this._careCert = 'Yes, in progress or partially completed';
            break;
        }
        return true;
      }
    } else {
      return true;
    }
  }

  _validateCareCertDate() {
    const myCareCertDate = this._currentLine.CARECERTDATE;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if (this._careCert) {
      const today = moment(new Date());
      const myCareCertRealDate = moment.utc(myCareCertDate, "DD/MM/YYYY");
  
      // optional
      if (myCareCertDate && !dateRegex.test(myCareCertDate)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CARE_CERT_DATE_ERROR,
          errType: 'CARECERTDATE_ERROR',
          error: "Care Certificate Date (CARECERTDATE) should by in dd/mm/yyyy format",
          source: this._currentLine.CARECERTDATE,
        });
        return false;
      } else if (myCareCertDate && (myCareCertRealDate.isAfter(today))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CARE_CERT_DATE_ERROR,
          errType: 'CARECERTDATE_ERROR',
          error: "Care Certificate (CARECERTDATE) Date can not be in future",
          source: this._currentLine.CARECERTDATE,
        });
        return false;
      } else if (myCareCertDate) {
        this._careCertDate = myCareCertRealDate;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateRecSource() {
    const myRecSource = parseInt(this._currentLine.RECSOURCE);

    // optional
    if (this._currentLine.RECSOURCE && this._currentLine.RECSOURCE.length > 0) {
      if (isNaN(myRecSource)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.RESOURCE_ERROR,
          errType: 'RECSOURCE_ERROR',
          error: "Recruitement Source (RECSOURCE) must be an integer",
          source: this._currentLine.RECSOURCE,
        });
        return false;
      } else {
        this._recSource = myRecSource;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateStartDate() {
    const myStartDate = this._currentLine.STARTDATE;

    // optional
    if (myStartDate && myStartDate.length > 0) {
      const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

      const today = moment(new Date());
      const myRealStartDate = moment.utc(myStartDate, "DD/MM/YYYY");
  
      if (!dateRegex.test(myStartDate)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.START_DATE_ERROR,
          errType: 'STARTDATE_ERROR',
          error: "Start Date (STARTDATE) should by in dd/mm/yyyy format",
          source: this._currentLine.STARTDATE,
        });
        return false;
      } else if (myRealStartDate.isAfter(today)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.START_DATE_ERROR,
          errType: 'STARTDATE_ERROR',
          error: "Start Date (STARTDATE) can not be in future",
          source: this._currentLine.STARTDATE,
        });
        return false;
      } else {
        this._startDate = myRealStartDate;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateStartInsect() {

    const myStartInsect = this._currentLine.STARTINSECT;

    // optional
    if (myStartInsect && myStartInsect.length > 0) {
      const yearRegex = /^\d{4}$/;

      if (!yearRegex.test(myStartInsect)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.START_INSECT_ERROR,
          errType: 'START_INSECT_ERROR',
          error: "Start Insect (STARTINSECT) must be 4 number ",
          source: this._currentLine.STARTINSECT,
        });
        return false;
      }
      else {
        this._startInsect = parseInt(myStartInsect, 10);
        return true;
      }
    } else {
      return true;
    }
  }

  _validateApprentice() {
    const apprenticeValues = [1,2,999];
    const myApprentice = parseInt(this._currentLine.APPRENTICE, 10);

    // optional
    if (this._currentLine.APPRENTICE && this._currentLine.APPRENTICE.length) {
      if (isNaN(myApprentice)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.APPRENCTICE_ERROR,
          errType: 'APPRENTICE_ERROR',
          error: "Apprentice (APPRENTICE) must be an integer",
          source: this._currentLine.APPRENTICE,
        });
        return false;
      } else if (!apprenticeValues.includes(myApprentice)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.APPRENCTICE_ERROR,
          errType: 'APPRENTICE_ERROR',
          error: "Apprentice (APPRENTICE) value must 1(Yes), 2(No) or 999(Unknown)",
          source: this._currentLine.APPRENTICE,
        });
        return false;
      }
      else {
        switch (myApprentice) {
          case 1:
            this._apprentice = 'Yes';
            break;
          case 2:
            this._apprentice = 'No';
            break;
          case 999:
            this._apprentice = 'Don\'t know';
            break;
        }
        return true;
      }  
    } else {
      return true;
    }
  }

  _validateFullTime() {
    const fullTimeValues = [1, 2, 3];
    const myfullTime = parseInt(this._currentLine.FULLTIME,10);

    // optional
    if (this._currentLine.FULLTIME && this._currentLine.FULLTIME.length > 0)
    {
      if (isNaN(myfullTime)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.FULLTIME_ERROR,
          errType: 'FULLTIME_ERROR',
          error: "Full Time (FULLTIME) must be an integer",
          source: this._currentLine.FULLTIME,
        });
        return false;
      } else if (!fullTimeValues.includes(myfullTime)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.FULLTIME_ERROR,
          errType: 'FULLTIME_ERROR',
          error: "Apprentice (FULLTIME) value must 1(FullTime), 2(PartTime) or 3(Neither)",
          source: this._currentLine.FULLTIME,
        });
        return false;
      }
      else {
        this._fullTime = myfullTime;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateZeroHourContract() {
    const zeroHourContractValues = [1, 2, 999];
    const myZeroHourContract = parseInt(this._currentLine.ZEROHRCONT, 10);

    // optional
    if (this._currentLine.ZEROHRCONT && this._currentLine.ZEROHRCONT.length > 0) {
      if (isNaN(myZeroHourContract)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ZERO_HRCONT_ERROR,
          errType: 'ZEROHRCONT_ERROR',
          error: "Zero Hour Contract (ZEROHRCONT) must be an integer",
          source: this._currentLine.ZEROHRCONT,
        });
        return false;
      } else if (!zeroHourContractValues.includes(myZeroHourContract)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ZERO_HRCONT_ERROR,
          errType: 'ZEROHRCONT_ERROR',
          error: "Zero Hour Contract (ZEROHRCONT) value must 1(Yes), 2(No) or 999(Unknown)",
          source: this._currentLine.ZEROHRCONT,
        });
        return false;
      }
      else {
        switch (myZeroHourContract) {
          case 1:
            this._zeroHourContract = 'Yes';
            break;
          case 2:
            this._zeroHourContract = 'No';
            break;
          case 999:
            this._zeroHourContract = 'Don\'t know';
            break;
        }
        return true;
      }
    } else {
      return true;
    }
  }

  _validateDaysSick() {
    const myDaysSick = parseFloat(this._currentLine.DAYSSICK);

    // optional
    if (this._currentLine.DAYSSICK && this._currentLine.DAYSSICK.length > 0) {
      const MAX_VALUE = 365.0;
      const DONT_KNOW_VALUE = 999;
      if (isNaN(myDaysSick)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.DAYSICK_ERROR,
          errType: 'DAYSSICK_ERROR',
          error: "Day Sick (DAYSSICK) must be an integer or decimal",
          source: this._currentLine.DAYSSICK,
        });
        return false;
      } else if (myDaysSick > MAX_VALUE && myDaysSick != DONT_KNOW_VALUE) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.DAYSICK_ERROR,
          errType: 'DAYSSICK_ERROR',
          error: `Day Sick (DAYSSICK) value must less than ${parseInt(MAX_VALUE,10)} otherwise ${DONT_KNOW_VALUE}`,
          source: this._currentLine.DAYSSICK,
        });
        return false;
      }
      else {
        switch (myDaysSick) {
          case 999:
            this._daysSick = 'No';
            break;
          default:
            this._daysSick = myDaysSick;
        }
        return true;
      }
    } else {
      return true;
    }
  }

  _validateSalaryInt() {
    const salaryIntValues = [1, 3];
    const mySalaryInt = parseInt(this._currentLine.SALARYINT, 10);

    // optional
    if (this._currentLine.SALARYINT && this._currentLine.SALARYINT.length > 0) {
      if (isNaN(mySalaryInt)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SALARY_ERROR,
          errType: 'SALARYINT_ERROR',
          error: "Salary Int (SALARYINT) must be an integer",
          source: this._currentLine.SALARYINT,
        });
        return false;
      } else if (mySalaryInt && !salaryIntValues.includes(parseInt(mySalaryInt))) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SALARY_ERROR,
          errType: 'SALARYINT_ERROR',
          error: "Salary int (SALARYINT) value must 1(Annual Salary) or 3(Hourly Rate)",
          source: this._currentLine.SALARYINT,
        });
        return false;
      }
      else {
        switch (mySalaryInt) {
          case 1:
            this._salaryInt = 'Annually';
            break;
          case 3:
            this._salaryInt = 'Hourly';
            break;
          default:
            // not doing anything with unpaid
            this._salaryInt = null;
        }

        return true;
      }  
    } else {
      return true;
    }
  }

  _validateSalary() {
    const mySalary = parseInt(this._currentLine.SALARY);
    const digitRegex = /^[0-9]{1,9}$/;

    // optional
    if (this._currentLine.SALARY.length > 0) {
      // can only give (annual) salary if salary interval (SALARYINT) is annual
      if (this._salaryInt === null || this._salaryInt !== 'Annually') {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SALARY_ERROR,
          errType: 'SALARY_ERROR',
          error: "Salary (SALARY) only relevant if salary intervakl (SALARYINT) is Annual (1)",
          source: `SALARYINT (${this._currentLine.SALARYINT}) - SALARY (${this._currentLine.SALARY})`,
        });
        return false;
      } else if (isNaN(mySalary) || !digitRegex.test(this._currentLine.SALARY)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SALARY_ERROR,
          errType: 'SALARY_ERROR',
          error: "Salary (SALARY) must be an integer an upto 9 digits",
          source: this._currentLine.SALARY,
        });
        return false;
      }
      else {
        this._salary = mySalary;
        return true;
      }
    } else {
      return true;
    }
  }

  _validateHourlyRate() {
    const myHourlyRate = parseFloat(this._currentLine.HOURLYRATE);
    const digitRegex = /^\d+(\.\d{1,2})?$/;  // e.g. 15.53 or 0.53 or 1.53 or 100.53

    // optional
    if (this._currentLine.HOURLYRATE && this._currentLine.HOURLYRATE.length > 0) {
      // can only give (annual) salary if salary interval (SALARYINT) is hourly
      if (this._salaryInt === null || this._salaryInt !== 'Hourly') {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.HOURLY_RATE_ERROR,
          errType: 'HOURLY_RATE_ERROR',
          error: "Salary (HOURLYRATE) only relevant if salary intervakl (SALARYINT) is Hourly (3)",
          source: `SALARYINT(${this._currentLine.SALARYINT}) - HOURLYRATE (${this._currentLine.HOURLYRATE})`,
        });
        return false;
      } else if (isNaN(myHourlyRate) || !digitRegex.test(this._currentLine.HOURLYRATE)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.HOURLY_RATE_ERROR,
          errType: 'HOURLY_RATE_ERROR',
          error: "Hourly Rate (HOURLYRATE) must be decimal with upto two decimal points e.g. 12.0 or 5.31",
          source: this._currentLine.HOURLYRATE,
        });
        return false;
      }
      else {
        this._hourlyRate = myHourlyRate;
        return true;
      }  
    } else {
      return true;
    }
  }

  _validateMainJobRole() {
    const myMainJobRole = parseInt(this._currentLine.MAINJOBROLE, 10);

    // note - optional in bulk import spec, but mandatory in ASC WDS frontend and backend
    if (isNaN(myMainJobRole)) {
      this._validationErrors.push({
        lineNumber: this._lineNumber,
        errCode: Worker.MAIN_JOB_ROLE_ERROR,
        errType: 'MAIN_JOB_ROLE_ERROR',
        error: "Main Job Role (MAINJOBROLE) must be an integer",
        source: this._currentLine.MAINJOBROLE,
      });
      return false;
    }
    else {
      this._mainJobRole = myMainJobRole;
      return true;
    }
  }

  _validateMainJobDesc() {
    const myMainJobDesc = this._currentLine.MAINJRDESC;
    const MAX_LENGTH = 120;

    // main job description is optional, but even then, only relevant if main job is 23 or 27
    const ALLOWED_JOBS = [23, 27];

    if (ALLOWED_JOBS.includes(this._mainJobRole)) {
      if (this._currentLine.MAINJRDESC && this._currentLine.MAINJRDESC.length > 0) {
        if (myMainJobDesc.length >= MAX_LENGTH) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.MAIN_JOB_DESC_ERROR,
            errType: 'MAIN_JOB_DESC_ERROR',
            error: `Main Job Description (MAINJRDESC) must be no more than ${MAX_LENGTH} characters`,
            source: this._currentLine.MAINJRDESC,
          });
          return false;
        } 
        else {
          this._mainJobDesc = myMainJobDesc;
          return true;
        }
  
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  _validateContHours() {
    const myContHours = parseFloat(this._currentLine.CONTHOURS);
    const digitRegex = /^\d+(\.[0,5]{1})?$/;  // e.g. 15 or 0.5 or 1.0 or 100.5

    // optional
    if (this._currentLine.CONTHOURS && this._currentLine.CONTHOURS.length > 0) {
      if (isNaN(myContHours) || !digitRegex.test(this._currentLine.CONTHOURS)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CONT_HOURS_ERROR,
          errType: 'CONT_HOURS_ERROR',
          error: "Contract Hours (CONTHOURS) must be decimal to the nearest 0.5 e.g. 12, 12.0 or 12.5",
          source: this._currentLine.CONTHOURS,
        });
        return false;
      }
      else {
        if (Math.floor(myContHours) === 999) {
          this._contHours = 'No';
        } else {
          this._contHours = myContHours;
        }
        return true;
      }  
    } else {
      return true;
    }
  }

  _validateAddlHours() {
    const myAddlHours = parseFloat(this._currentLine.ADDLHOURS);
    const digitRegex = /^\d+(\.[0,5]{1})?$/;  // e.g. 15 or 0.5 or 1.0 or 100.5

    // optional
    if (this._currentLine.ADDLHOURS && this._currentLine.ADDLHOURS.length > 0) {
      if (isNaN(myAddlHours) || !digitRegex.test(this._currentLine.ADDLHOURS)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ADDL_HOURS_ERROR,
          errType: 'ADDL_HOURS_ERROR',
          error: "Additional Hours (ADDLHOURS) must be decimal to the nearest 0.5 e.g. 12, 12.0 or 12.5",
          source: this._currentLine.ADDLHOURS,
        });
        return false;
      }
      else {
        if (Math.floor(myAddlHours) === 999) {
          this._addlHours = 'No';
        } else {
          this._addlHours = myAddlHours;
        }
        return true;
      }  
    } else {
      return true;
    }
  }

  _validateOtherJobs() {
    // other jobs (optional) is a semi colon delimited list of integers
    if ( this._currentLine.OTHERJOBROLE &&  this._currentLine.OTHERJOBROLE.length > 0) {
      const listOfotherJobs = this._currentLine.OTHERJOBROLE.split(';');
      const listOfotherJobsDescriptions = this._currentLine.OTHERJRDESC.split(';');
  
      const localValidationErrors = [];
      const isValid = listOfotherJobs.every(thiJob => !Number.isNaN(parseInt(thiJob)));
      if (!isValid) {
        localValidationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.OTHER_JOB_ROLE_ERROR,
          errType: `OTHER_JOB_ROLE_ERROR`,
          error: "Other Job Roles (OTHERJOBROLE) must be a semi-colon delimited list of integers",
          source: this._currentLine.OTHERJOBROLE,
        });
      } else if (listOfotherJobs.length != listOfotherJobsDescriptions.length) {
        localValidationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.OTHER_JOB_ROLE_ERROR,
          errType: `OTHER_JOB_ROLE_ERROR`,
          error: "Other Job Roles (OTHERJOBROLE) count and Other Job Roles Descriptions (OTHERJRDESC) count must equal",
          source: `${this._currentLine.OTHERJOBROLE} - ${this._currentLine.OTHERJRDESC}`,
        });
      } else {
        const myJobDescriptions = [];
        this._otherJobs = listOfotherJobs.map((thisJob, index) => {
          const thisJobIndex = parseInt(thisJob, 10);
  
          // if the job is one of the many "other" job roles, then need to validate the "other description"
          const otherJobs = [23, 27];   // these are the original budi codes
          if (otherJobs.includes(thisJobIndex)) {
            const myJobOther = listOfotherJobsDescriptions[index];
            const MAX_LENGTH = 120;
            if (!myJobOther || myJobOther.length == 0) {
              localValidationErrors.push({
                lineNumber: this._lineNumber,
                errCode: Worker.OTHER_JR_DESC_ERROR,
                errType: `OTHER_JR_DESC_ERROR`,
                error: `Other Job Role (OTHERJOBROLE:${index+1}) is an 'other' job and consequently (OTHERJRDESC:${index+1}) must be defined`,
                source: `${this._currentLine.OTHERJOBROLE} - ${listOfotherJobsDescriptions[index]}`,
              });
              myJobDescriptions.push(null);
            } else if (myJobOther.length > MAX_LENGTH) {
              localValidationErrors.push({
                lineNumber: this._lineNumber,
                errCode: Worker.OTHER_JR_DESC_ERROR,
                errType: `OTHER_JR_DESC_ERROR`,
                error: `Other Job Role (OTHERJOBROLE:${index+1}) is an 'other' job and (OTHERJRDESC:${index+1}) must not be greater than ${MAX_LENGTH} characters`,
                source: `${this._currentLine.OTHERJOBROLE} - ${listOfotherJobsDescriptions[index]}`,
              });
            } else {
              myJobDescriptions.push(listOfotherJobsDescriptions[index]);
            }
          } else {
            myJobDescriptions.push(null);
          }
  
          return thisJobIndex;
        });
  
        this._otherJobsOther = myJobDescriptions;
      }
  
      if (localValidationErrors.length > 0) {
        localValidationErrors.forEach(thisValidation => this._validationErrors.push(thisValidation));;
        return false;
      }
  
      return true;
    } else {
      return true;
    }
  }

  _validateRegisteredNurse() {
    const myRegisteredNurse = parseInt(this._currentLine.NMCREG, 10);

    // optional
    if (this._currentLine.NMCREG && this._currentLine.NMCREG.length > 0) {
      // only check is main job or other job includes job role "16" (nurse)
      const NURSING_ROLE = 16;

      if ((this._mainJobRole && this._mainJobRole == NURSING_ROLE) ||
          (this._otherJobs && this._otherJobs.includes(NURSING_ROLE))) {
        if (isNaN(myRegisteredNurse)) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.NMCREG_ERROR,
            errType: 'NMCREG_ERROR',
            error: "Registered Nursing (NMCREG) must be an integer",
            source: this._currentLine.NMCREG,
          });
          return false;
        }
        else {
          this._registeredNurse = myRegisteredNurse;
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  _validateNursingSpecialist() {
    const myNursingSpecialist = parseFloat(this._currentLine.NURSESPEC);

    // optional
    if (this._currentLine.NURSESPEC && this._currentLine.NURSESPEC.length > 0) {
      // only check is main job or other job includes job role "16" (nurse)
      const NURSING_ROLE = 16;

      if ((this._mainJobRole && this._mainJobRole == NURSING_ROLE) ||
          (this._otherJobs && this._otherJobs.includes(NURSING_ROLE))) {
        if (isNaN(myNursingSpecialist)) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.NURSE_SPEC_ERROR,
            errType: 'NURSE_SPEC_ERROR',
            error: "Nursing Specialist (NURSESPEC) must be an integer",
            source: this._currentLine.NURSESPEC,
          });
          return false;
        }
        else {
          this._nursingSpecialist = myNursingSpecialist;
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  _validateNationality() {
    const myNationality = parseInt(this._currentLine.NATIONALITY, 10);

    // optional
    if (this._currentLine.NATIONALITY && this._currentLine.NATIONALITY.length > 0) {
      if (isNaN(myNationality)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NATIONALITY_ERROR,
          errType: 'NATIONALITY_ERROR',
          error: "Nationality (NATIONALITY) must be an integer",
          source: this._currentLine.NATIONALITY,
        });
        return false;
      }
      else {
        this._nationality = myNationality;
        return true;
      }

    } else {
      return true;
    }
  }

  _validateCountryOfBirth() {
    const myCountry = parseInt(this._currentLine.COUNTRYOFBIRTH, 10);

    // optional
    if (this._currentLine.COUNTRYOFBIRTH && this._currentLine.COUNTRYOFBIRTH.length > 0) {
      if (isNaN(myCountry)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.COUNTRY_OF_BIRTH_ERROR,
          errType: 'COUNTRY_OF_BIRTH_ERROR',
          error: "Country of Birth (COUNTRYOFBIRTH) must be an integer",
          source: this._currentLine.COUNTRYOFBIRTH,
        });
        return false;
      }
      else {
        this._countryOfBirth = myCountry;
        return true;
      }

    } else {
      return true;
    }
  }

  _validateSocialCareQualification() {
    const mySocialCare = this._currentLine.SCQUAL ? this._currentLine.SCQUAL.split(';') : null;

    // optional
    if (this._currentLine.SCQUAL && this._currentLine.SCQUAL.length > 0) {
      const localValidationErrors = [];

      const ALLOWED_SOCIAL_CARE_VALUES = [1, 2, 999];
      const mySocialCareIndicator = parseInt(mySocialCare[0]);

      if (isNaN(mySocialCareIndicator)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SOCIALCARE_QUAL_ERROR,
          errType: 'SOCIALCARE_QUAL_ERROR',
          error: "Social Care Qualification (SCQUAL) indicator (before semi colon) must be an integer",
          source: this._currentLine.SCQUAL,
        });
      }

      if (!ALLOWED_SOCIAL_CARE_VALUES.includes(mySocialCareIndicator)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SOCIALCARE_QUAL_ERROR,
          errType: 'SOCIALCARE_QUAL_ERROR',
          error: `Social Care Qualification (SCQUAL) indicator (before semi colon) must be one of: ${ALLOWED_SOCIAL_CARE_VALUES}`,
          source: this._currentLine.SCQUAL,
        });
      }

      this._socialCareQualification = mySocialCareIndicator;

      // if the social care indicator is "1" (yes) - then get the next value which must be the level
      if (mySocialCareIndicator == 1) {
        const mySocialCareLevel = parseInt(mySocialCare[1]);
        if (isNaN(mySocialCareLevel)) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.SOCIALCARE_QUAL_ERROR,
            errType: 'SOCIALCARE_QUAL_ERROR',
            error: "Social Care Qualification (SCQUAL) level (after semi colon) must be an integer",
            source: this._currentLine.SCQUAL,
          });
        }
        this._socialCareQualificationlevel = mySocialCareLevel;  
      }

      if (localValidationErrors.length > 0) {
        localValidationErrors.forEach(thisValidation => this._validationErrors.push(thisValidation));;
        return false;
      }

      return true;

    } else {
      return true;
    }
  }

  _validateNonSocialCareQualification() {
    const myNonSocialCare = this._currentLine.NONSCQUAL ? this._currentLine.NONSCQUAL.split(';') : null;

    // optional
    if (this._currentLine.NONSCQUAL && this._currentLine.NONSCQUAL.length > 0) {
      const localValidationErrors = [];

      const ALLOWED_SOCIAL_CARE_VALUES = [1, 2, 999];
      const myNonSocialCareIndicator = parseInt(myNonSocialCare[0]);

      if (isNaN(myNonSocialCareIndicator)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NON_SOCIALCARE_QUAL_ERROR,
          errType: 'NON_SOCIALCARE_QUAL_ERROR',
          error: "Non-Social Care Qualification (NONSCQUAL) indicator (before semi colon) must be an integer",
          source: this._currentLine.NONSCQUAL,
        });
      }

      if (!ALLOWED_SOCIAL_CARE_VALUES.includes(myNonSocialCareIndicator)) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NON_SOCIALCARE_QUAL_ERROR,
          errType: 'NON_SOCIALCARE_QUAL_ERROR',
          error: `Non-Social Care Qualification (NONSCQUAL) indicator (before semi colon) must be one of: ${ALLOWED_SOCIAL_CARE_VALUES}`,
          source: this._currentLine.NONSCQUAL,
        });
      }

      this._nonSocialCareQualification = myNonSocialCareIndicator;

      // if the social care indicator is "1" (yes) - then get the next value which must be the level
      if (myNonSocialCareIndicator == 1) {
        const myNonSocialCareLevel = parseInt(myNonSocialCare[1]);
        if (isNaN(myNonSocialCareLevel)) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.NON_SOCIALCARE_QUAL_ERROR,
            errType: 'NON_SOCIALCARE_QUAL_ERROR',
            error: "Non-Social Care Qualification (NONSCQUAL) level (after semi colon) must be an integer",
            source: this._currentLine.NONSCQUAL,
          });
        }
        this._nonSocialCareQualificationlevel = myNonSocialCareLevel;
      }

      if (localValidationErrors.length > 0) {
        localValidationErrors.forEach(thisValidation => this._validationErrors.push(thisValidation));;
        return false;
      }

      return true;

    } else {
      return true;
    }
  }

  __validateQualification(qualificationName, qualificationError, qualificationErrorName, qualification,
                          qualificationDescName, qualificationDescError, qualificationDescErrorName, qualificationDesc) {
    const myQualification = qualification ? qualification.split(';') : null;

    // optional
    if (qualification && qualification.length > 0) {
      const localValidationErrors = [];

      const qualificationId = parseInt(myQualification[0]);

      if (isNaN(qualificationId)) {
        localValidationErrors.push({
          lineNumber: this._lineNumber,
          errCode: qualificationError,
          errType: qualificationErrorName,
          error: `Qualification (${qualificationName}) index (before semi colon) must be an integer`,
          source: qualification,
        });
      }

      // if the social care indicator is "1" (yes) - then get the next value which must be the level
      const qualificationYear = parseInt(myQualification[1]);
      if (isNaN(qualificationYear)) {
        localValidationErrors.push({
          lineNumber: this._lineNumber,
          errCode: qualificationError,
          errType: qualificationErrorName,
          error: `Qualification (${qualificationName}) year (after semi colon) must be an integer`,
          source: qualification,
        });
      }

      let myQualificationDesc = null;
      // qualification description is optional
      if (qualificationDesc && qualificationDesc.length > 0) {
        const MAX_LENGTH=120;
        if (qualificationDesc.length > MAX_LENGTH) {
          localValidationErrors.push({
            lineNumber: this._lineNumber,
            errCode: qualificationDescError,
            errType: qualificationDescErrorName,
            error: `Qualification Description (${qualificationDescName}) must be no more than 120 characters`,
            source: qualificationDesc,
          });
        } else {
          myQualificationDesc = qualificationDesc; 
        }
      }

      if (localValidationErrors.length > 0) {
        localValidationErrors.forEach(thisValidation => this._validationErrors.push(thisValidation));;
        return false;
      }

      return {
        id: qualificationId,
        year: !isNaN(qualificationYear) ? qualificationYear : null,
        desc: myQualificationDesc,
      };

    } else {
      return null;  // not present
    }
  }

  // this is a complex mapping across NOQUALWT, QUALWT, QUALWTNOTES, QUALACH01,QUALACH01NOTES, QUALACH02, QUALACH02NOTES, QUALACH03 and QUALACH03NOTES
  // NOTE - the CSV format expects the user to create additional columns if a worker has more than three qualifications.
  //        This approach (adding columns) differs to the approach of "semi colon" delimited data.
  // https://trello.com/c/ttV4g8mZ. 
  _validationQualificationRecords() {
    // Note - ASC WDS does not support qualifications in progress (not yet achieved)
    // Thus ignoring:
    // NOQUALWT
    // QUALWT

    const NO_QUALIFICATIONS = 20;
    const padNumber = (number) => (number < 10) ? `0${number}` : number;

    // process all attained qualifications, (QUALACH{n}/QUALACH{n}NOTES)
    const myProcessedQualifications = Array(NO_QUALIFICATIONS).fill().map((x, i) => {
      const index = padNumber(i+1);

      return this.__validateQualification(
        `QUALACH${index}`,
        Worker[`QUAL_ACH${index}_ERROR`],
        `QUAL_ACH${index}_ERROR`,
        this._currentLine[`QUALACH${index}`],
        `QUALACH${index}NOTES`,
        Worker[`QUAL_ACH${index}_NOTES_ERROR`],
        `QUAL_ACH${index}_NOTES_ERROR`,
        this._currentLine[`QUALACH${index}NOTES`]
      );
    });

    // remove from the local set of qualifications any false/null entries
    this._qualifications = myProcessedQualifications.filter(thisQualification => thisQualification !== null && thisQualification !== false);
  }

  //transform related
  _transformContractType() {
    if (this._contractType) {
      const myValidatedContractType = BUDI.contractType(BUDI.TO_ASC, this._contractType);

      if (!myValidatedContractType) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.CONTRACT_TYPE_ERROR,
          errType: `CONTRACT_TYPE_ERROR`,
          error: `Employment Status (EMPLSTATUS): ${this._contractType} is unknown`,
          source: this._currentLine.EMPLSTATUS,
        });
      } else {
        this._contractType = myValidatedContractType;
      }
    }
  };

  //transform related
  _transformEthnicity() {
    if (this._ethnicity) {
      const myValidatedEthnicity = BUDI.ethnicity(BUDI.TO_ASC, this._ethnicity);

      if (!myValidatedEthnicity) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.ETHNICITY_ERROR,
          errType: `ETHNICITY_ERROR`,
          error: `Ethnicity (ETHNICITY): ${this._ethnicity} is unknown`,
          source: this._currentLine.ETHNICITY,
        });
      } else {
        this._ethnicity = myValidatedEthnicity;
      }
    }
  };

  //transform related
  _transformRecruitment() {
    if (this._recSource) {
      if (this._recSource === 16) {
        this._recSource = 'No';
      } else {
        const myValidatedRecruitment = BUDI.recruitment(BUDI.TO_ASC, this._recSource);

        if (!myValidatedRecruitment) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.RECSOURCE_ERROR,
            errType: `RECSOURCE_ERROR`,
            error: `Recruitement Source (RECSOURCE): ${this._recSource} is unknown`,
            source: this._currentLine.RECSOURCE,
          });
        } else {
          this._recSource = myValidatedRecruitment;
        }  
      }
    }
  };

  _transformMainJobRole() {
    if (this._mainJobRole) {
      const myValidatedJobRole = BUDI.jobRoles(BUDI.TO_ASC, this._mainJobRole);

      if (!myValidatedJobRole) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.MAIN_JOB_ROLE_ERROR,
          errType: `MAIN_JOB_ROLE_ERROR`,
          error: `Main Job Role (MAINJOBROLE): ${this._mainJobRole} is unknown`,
          source: this._currentLine.MAINJOBROLE,
        });
      } else {
        this._mainJobRole = myValidatedJobRole;
      }
    }
  };

  _transformOtherJobRoles() {
    if (this._otherJobs) {
      const mappedJobs = [];

      this._otherJobs.forEach(thisJob => {
        const myValidatedJobRole = BUDI.jobRoles(BUDI.TO_ASC, thisJob);

        if (!myValidatedJobRole) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.MAIN_JOB_ROLE_ERROR,
            errType: `OTHER_JOB_ROLE_ERROR`,
            error: `Other Job Role (OTHERJOBROLE): ${thisJob} is unknown`,
            source: this._currentLine.OTHERJOBROLE,
          });
        } else {
          mappedJobs.push(myValidatedJobRole);
        }
      });

      this._otherJobs = mappedJobs;
    }
  }


  _transformRegisteredNurse() {
    if (this._registeredNurse) {
      switch (this._registeredNurse) {
        case 1:
          this._registeredNurse = 'Adult nurse';
          break;
        case 2:
          this._registeredNurse = 'Mental health nurse';
          break;
        case 3:
          this._registeredNurse = 'Learning disabilities nurse';
          break;
        case 4:
          this._registeredNurse = 'Children\'s nurse';
          break;
        case 5:
          this._registeredNurse = 'Enrolled nurse';
          break;
        default:
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.NURSE_SPEC_ERROR,
            errType: `NMCREG_ERROR`,
            error: `Registered Nurse (NMCREG): ${this._registeredNurse} is unknown`,
            source: this._currentLine.NMCREG,
          });
      }
    }
  }
  
  _transformNursingSpecialist() {
    if (this._nursingSpecialist) {
      const myValidatedSpecialist = BUDI.nursingSpecialist(BUDI.TO_ASC, this._nursingSpecialist);

      if (!myValidatedSpecialist) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NURSE_SPEC_ERROR,
          errType: `NURSE_SPEC_ERROR`,
          error: `Nursing Specialist (NURSESPEC): ${this._nursingSpecialist} is unknown`,
          source: this._currentLine.NURSESPEC,
        });
      } else {
        this._nursingSpecialist = myValidatedSpecialist;
      }
    }
  };

  _transformNationality() {
    if (this._nationality) {
      // ASC WDS nationality is a split enum/index
      if (this._nationality == 826) {
        this._nationality = 'British';
      } else if (this._nationality == 998) {
        this._nationality = 'Don\'t know';
      } else if (this._nationality == 999) {
        this._nationality = 'Other';
      } else {
        const myValidatedNationality = BUDI.nationality(BUDI.TO_ASC, this._nationality);

        if (!myValidatedNationality) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.NATIONALITY_ERROR,
            errType: `NATIONALITY_ERROR`,
            error: `Nationality (NATIONALITY): ${this._nationality} is unknown`,
            source: this._currentLine.NURSESPEC,
          });
        } else {
          this._nationality = myValidatedNationality;
        }  
      }
    }
  };


  _transformCountryOfBirth() {
    if (this._countryOfBirth) {
      // ASC WDS country of birth is a split enum/index
      if (this._countryOfBirth == 826) {
        this._countryOfBirth = 'United Kingdom';
      } else if (this._countryOfBirth == 998) {
        this._countryOfBirth = 'Don\'t know';
      } else if (this._countryOfBirth == 999) {
        this._countryOfBirth = 'Other';
      } else {
        const myValidatedCountry = BUDI.country(BUDI.TO_ASC, this._countryOfBirth);

        if (!myValidatedCountry) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.COUNTRY_OF_BIRTH_ERROR,
            errType: `COUNTRY_OF_BIRTH_ERROR`,
            error: `Country of Birth (COUNTRYOFBIRTH): ${this._countryOfBirth} is unknown`,
            source: this._currentLine.COUNTRYOFBIRTH,
          });
        } else {
          this._countryOfBirth = myValidatedCountry;
        }
      }
    }
  };

  _transformSocialCareQualificationLevel() {
    if (this._socialCareQualificationlevel) {
      // ASC WDS country of birth is a split enum/index
      const myValidatedQualificationLevel = BUDI.qualificationLevels(BUDI.TO_ASC, this._socialCareQualificationlevel);

      if (!myValidatedQualificationLevel) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.SOCIALCARE_QUAL_ERROR,
          errType: `SOCIALCARE_QUAL_ERROR`,
          error: `Social Care Qualiifcation (SCQUAL): Level ${this._socialCareQualificationlevel} is unknown`,
          source: this._currentLine.SCQUAL,
        });
      } else {
        this._socialCareQualificationlevel = myValidatedQualificationLevel;
      }
    }
  };

  _transformNonSocialCareQualificationLevel() {
    if (this._nonSocialCareQualificationlevel) {
      // ASC WDS country of birth is a split enum/index
      const myValidatedQualificationLevel = BUDI.qualificationLevels(BUDI.TO_ASC, this._nonSocialCareQualificationlevel);

      if (!myValidatedQualificationLevel) {
        this._validationErrors.push({
          lineNumber: this._lineNumber,
          errCode: Worker.NON_SOCIALCARE_QUAL_ERROR,
          errType: `NON_SOCIALCARE_QUAL_ERROR`,
          error: `Non Social Care Qualiifcation (NONSCQUAL): Level ${this._nonSocialCareQualificationlevel} is unknown`,
          source: this._currentLine.NONSCQUAL,
        });
      } else {
        this._nonSocialCareQualificationlevel = myValidatedQualificationLevel;
      }
    }
  };

  _transformQualificationRecords() {
    if (this._qualifications && Array.isArray(this._qualifications)) {
      const mappedQualifications = [];

      this._qualifications.forEach(thisQualification => {
        const myValidatedQualification = BUDI.qualifications(BUDI.TO_ASC, thisQualification.id);

        // TODO - WA REMOVE THE 72 test - for debugging only!!!!!
        if (!myValidatedQualification) {
          this._validationErrors.push({
            lineNumber: this._lineNumber,
            errCode: Worker.QUAL_ACH_ERROR,
            errType: `QUAL_ACH_ERROR`,
            error: `Qualification (QUALACH01/QUALACH02/QUALACH03): ${thisQualification.id} is unknown`,
            source: `${this._currentLine.QUALACH01}:${this._currentLine.QUALACH02}:${this._currentLine.QUALACH03}`,
          });
        } else {
          const newQual = thisQualification;
          newQual.id = myValidatedQualification;
          mappedQualifications.push(newQual);
        }
      });

      this._qualifications = mappedQualifications;

    }
  }
  


  // returns true on success, false is any attribute of Worker fails
  validate() {
    let status = true;

    status = !this._validateContractType() ? false : status;
    status = !this._validateLocalId() ? false : status;
    status = !this._validateUniqueWorkerId() ? false : status;
    status = !this._validateChangeUniqueWorkerId() ? false : status;
    status = !this._validateStatus() ? false : status;
    status = !this._validateDisplayId() ? false : status;
    status = !this._validateNINumber() ? false : status;
    status = !this._validatePostCode() ? false : status;
    status = !this._validateDOB() ? false : status;
    status = !this._validateGender() ? false : status;
    status = !this._validateEthnicity() ? false : status;
    status = !this._validateNationality() ? false : status;
    status = !this._validateCitizenShip() ? false : status;
    status = !this._validateCountryOfBirth() ? false : status;
    status = !this._validateYearOfEntry() ? false : status;
    status = !this._validateDisabled() ? false : status;
    status = !this._validateIndStatus() ? false : status;
    status = !this._validateIndDate() ? false : status;
    status = !this._validateCareCert() ? false : status;
    status = !this._validateCareCertDate() ? false : status;
    status = !this._validateRecSource() ? false : status;
    status = !this._validateStartDate() ? false : status;
    status = !this._validateStartInsect() ? false : status;
    status = !this._validateApprentice() ? false : status;
    status = !this._validateFullTime() ? false : status;
    status = !this._validateZeroHourContract() ? false : status;
    status = !this._validateDaysSick() ? false : status;
    status = !this._validateSalaryInt() ? false : status;
    status = !this._validateSalary() ? false : status;
    status = !this._validateHourlyRate() ? false : status;
    status = !this._validateMainJobRole() ? false : status;
    status = !this._validateMainJobDesc() ? false : status;
    status = !this._validateContHours() ? false : status;
    status = !this._validateAddlHours() ? false : status;
    status = !this._validateOtherJobs() ? false : status;
    status = !this._validateRegisteredNurse() ? false : status;
    status = !this._validateNursingSpecialist() ? false : status;

    status = !this._validateSocialCareQualification() ? false : status;
    status = !this._validateNonSocialCareQualification() ? false : status;

    status = !this._validationQualificationRecords() ? false : status;
    
    return status;
  };

  // returns true on success, false is any attribute of Worker fails
  transform() {
    let status = true;

    // status = !this._transformMainService() ? false : status;
    status = !this._transformContractType() ? false : status;
    status = !this._transformEthnicity() ? false : status;
    status = !this._transformRecruitment() ? false : status;
    status = !this._transformMainJobRole() ? false : status;
    status = !this._transformOtherJobRoles() ? false : status;
    status = !this._transformRegisteredNurse() ? false : status;
    status = !this._transformNursingSpecialist() ? false : status;
    status = !this._transformNationality() ? false : status;
    status = !this._transformCountryOfBirth() ? false : status;
    status = !this._transformSocialCareQualificationLevel() ? false : status;
    status = !this._transformNonSocialCareQualificationLevel() ? false : status;
    status = !this._transformQualificationRecords() ? false : status;

    return status;
  };

  toJSON() {
    // force to undefined if not set, because 'undefined' when JSON stingified is not rendered
    return {
      localId: this._localId,
      uniqueWorkerId: this._uniqueWorkerId,
      changeUniqueWorker: this._changeUniqueWorkerId ? this._changeUniqueWorkerId : undefined,
      status: this._status,
      displayId: this._displayId,
      niNumber: this._NINumber ? this._NINumber : undefined,
      postcode: this._postCode ? this._postCode : undefined,
      dateOfBirth: this._DOB ? this._DOB.format('DD/MM/YYYY') : undefined,
      gender: this._gender ? this._gender : undefined,
      contractType: this._contractType,
      ethnicity: this._ethnicity ? this._ethnicity : undefined,
      nationality: this._nationality ? this._nationality : undefined,
      britishCitizenship: this._britishNationality ? this._britishNationality : undefined,
      countryofBirth: this._countryOfBirth ? this._countryOfBirth : undefined,
      yearOfEntry: this._yearOfEntry ? this._yearOfEntry : undefined,
      disabled: this._disabled !== null ? this._disabled : undefined,
      careCertificate: this._careCert ? {
        value: this._careCert,
        date: this._careCertDate ? this._careCertDate.format('DD/MM/YYYY') : this._careCertDate
      } : undefined,
      recruitmentSource : this._recSource ? this._recSource : undefined,
      startDate: this._startDate ? this._startDate.format('DD/MM/YYYY') : undefined,
      startedInSector : this._startInsect ? this._startInsect : undefined,
      apprenticeship: this._apprentice ? this._apprentice : undefined,
      fullTime: this._fullTime ? this._fullTime : undefined,
      zeroHoursContract: this._zeroHourContract ? this._zeroHourContract : undefined,
      daysSick: this._daysSick ? this._daysSick : undefined,
      salaryInterval: this._salaryInt ? this._salaryInt : undefined,
      salary: this._salary ? this._salary : undefined,
      hourlyRate: this._hourlyRate ? this._hourlyRate : undefined,
      mainJob: {
        role: this._mainJobRole,
        other: this._mainJobDesc ? this._mainJobDesc : undefined
      },
      hours: {
        contractedHours : this._contHours !== null ? this._contHours : undefined,
        additionalHours : this._addlHours !== null ? this._addlHours : undefined,
      },
      otherJobs: this._otherJobs ? this._otherJobs.map((thisJob, index) => {
        return {
          job: thisJob,
          other: this._otherJobsOther && this._otherJobsOther[index] ? this._otherJobsOther[index] : undefined
        };
      }) : undefined,
      nursing: {
        registered: this._registeredNurse ? this._registeredNurse : undefined,
        specialist: this._nursingSpecialist ? this._nursingSpecialist : undefined
      },
      highestQualifications: {
        social: this._socialCareQualification ? {
          value: this._socialCareQualification,
          level: this._socialCareQualificationlevel ? this._socialCareQualificationlevel : undefined,
        } : undefined,
        nonSocial: this._nonSocialCareQualification ? {
          value: this._nonSocialCareQualification,
          level: this._nonSocialCareQualificationlevel ? this._nonSocialCareQualificationlevel : undefined,
        } : undefined
      },
      qualifications: this._qualifications ? this._qualifications.map(thisQual => {
        if (!thisQual) return undefined;
        return {
          id: thisQual.id,
          year: thisQual.year ? thisQual.year : undefined,
          notes: thisQual.desc ? thisQual.desc : undefined,
        };
      }) : undefined,
    };
  };

  toAPI() {
    const changeProperties = {
    // the minimum to create a new worker
      nameOrId : this._uniqueWorkerId,
      contract : this._contractType,
      mainJob : {
        jobId: this._mainJobRole,
        other: this._mainJobDesc,
      },
      otherJobs: this._otherJobs ? this._otherJobs.map((thisJob, index) => {
          return {
            jobId: thisJob,
            other: this._otherJobsOther && this._otherJobsOther[index] ? this._otherJobsOther[index] : undefined,
          };
        }) : undefined,
      mainJobStartDate: this._startDate ? this._startDate.format('YYYY-MM-DD') : undefined,
      nationalInsuranceNumber: this._NINumber ? this._NINumber : undefined,
      dateOfBirth: this._DOB ? this._DOB.format('YYYY-MM-DD') : undefined,
      postcode: this._postCode ? this._postCode : undefined,
      gender: this._gender ? this._gender : undefined,
      ethnicity: this._ethnicity ? {
          ethnicityId: this._ethnicity
        } : undefined,
      britishCitizenship : this._britishNationality ? this._britishNationality : undefined,
      yearArrived: this._yearOfEntry ? 	{
          "value" : 'Yes',
          "year" : this._yearOfEntry
        } : undefined,
      disability: this._disabled ? this._disabled : undefined,
      careCertificate: this._careCert ? this._careCert : undefined,
      socialCareStartDate : this._startInsect ? {
          value : 'Yes',
          year : this._startInsect
        } : undefined,
      apprenticeshipTraining: this._apprentice ? this._apprentice : undefined,
      zeroHoursContract: this._zeroHourContract ? this._zeroHourContract : undefined,
      registeredNurse: this._registeredNurse ? this._registeredNurse : undefined,
      nurseSpecialism: this._nursingSpecialist ? {
          id: this._nursingSpecialist
        } : undefined,
    };

    if (this._nationality) {
      if (Number.isInteger(this._nationality)) {
        changeProperties.nationality = {
          value: 'Other',
          other: {
            nationalityId: this._nationality
          }
        };
      } else {
        changeProperties.nationality = {
          value: this._nationality
        };
      }
    }

    if (this._countryOfBirth) {
      if (Number.isInteger(this._countryOfBirth)) {
        changeProperties.countryOfBirth = {
          value: 'Other',
          other: {
            countryId: this._countryOfBirth
          }
        };
      } else {
        changeProperties.countryOfBirth = {
          value: this._countryOfBirth
        };
      }
    }

    if (this._recSource) {
      if (Number.isInteger(this._recSource)) {
        changeProperties.recruitedFrom = {
          value: 'Yes',
          from: {
            recruitedFromId: this._recSource
          }
        };
      } else {
        changeProperties.recruitedFrom = {
          value: this._recSource
        };
      }
    }

    if (this._daysSick) {
      if (Number.isInteger(this._daysSick)) {
        changeProperties.daysSick = {
          value : 'Yes',
          days: this._daysSick,
        };
      } else {
        changeProperties.daysSick = {
          value : this._daysSick,
        };
      }
    }
    
    if (this._salaryInt) {
      changeProperties.annualHourlyPay = {
        value: this._salaryInt
      };

      if (this._salaryInt === 'Annually') {
        changeProperties.annualHourlyPay.rate = this._salary ? this._salary : undefined;
      }
      if (this._salaryInt === 'Hourly') {
        changeProperties.annualHourlyPay.rate = this._hourlyRate ? this._hourlyRate : undefined;
      }
    }

    if (this._contHours) {
      if (Number.isInteger(this._contHours)) {
        changeProperties.weeklyHoursContracted = {
          value: 'Yes',
          hours: this._contHours,
        };
      } else {
        changeProperties.weeklyHoursContracted = {
          value: this._contHours,
        };
      }
    }
    if (this._addlHours) {
      if (Number.isInteger(this._addlHours)) {
        changeProperties.weeklyHoursAverage = {
          value: 'Yes',
          hours: this._addlHours,
        };
      } else {
        changeProperties.weeklyHoursAverage = {
          value: this._addlHours,
        };
      }
    }

    if (this._socialCareQualification) {
      switch (this._socialCareQualification) {
        case 1:
          changeProperties.qualificationInSocialCare = 'Yes';
          if (this._socialCareQualificationlevel) {
            changeProperties.socialCareQualification = {
              qualificationId: this._socialCareQualificationlevel,
            };
          }
          break;
        case 2:
          changeProperties.qualificationInSocialCare = 'No';
          break;
        case 999:
          changeProperties.qualificationInSocialCare = 'Don\'t know';
          break;
      }
    }

    if (this._nonSocialCareQualification) {
      switch (this._nonSocialCareQualification) {
        case 1:
          changeProperties.otherQualification = 'Yes';
          if (this._nonSocialCareQualificationlevel) {
            changeProperties.highestQualification = {
              qualificationId: this._nonSocialCareQualificationlevel,
            };
          }
          break;
        case 2:
          changeProperties.otherQualification = 'No';
          break;
        case 999:
          changeProperties.otherQualification = 'Don\'t know';
          break;
      }
    }

    return changeProperties;
  };

  // returns an array of Qualification mapped API entities - can be an array array if no qualifications
  toQualificationAPI() {
    const myMappedQuals = [];

    this._qualifications ? this._qualifications.forEach(thisQual => {
      if (!thisQual) return undefined;

      const changeProperties = {
        type: undefined,        // the qualification type does not come from bulk upload
        qualification : {
          id: thisQual.id,
        },
        year: thisQual.year ? thisQual.year : undefined,
        other: undefined,     // "other" qualifier does not come from bulk import
        notes: thisQual.desc ? thisQual.desc : undefined,
      };

      myMappedQuals.push(changeProperties);  
    }) : true;

    return myMappedQuals;
  }

  get validationErrors() {
    return this._validationErrors;
  };
};

module.exports.Worker = Worker;
