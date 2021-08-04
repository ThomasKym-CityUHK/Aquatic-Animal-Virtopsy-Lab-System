var NormObj = {
    strandingreport: {
      info: {
        display: {
          en: "General Information",
          zh: "基本資料"
        }
      },
      columns: {
        sid: {
          display: {
            en: "SPECIMEN ID",zh: "樣本編號"
          },
          requires: true,datatype: "varchar",datalen: 10
        },
        species: {
          display: {
            en: "Species",
            zh: "物種類別"
          },
          requires: false,datatype: "char",datalen: 2
        },
        specSpecific: {
          display: {
            en: "Species Specific",
            zh: "物種特異性"
          },
          requires: false,datatype: "varchar",datalen: 50
        },
        straDate: {
          display: {
            en: "Date Found",
            zh: "發現日期"
          },
          requires: false,
          datatype: "date",
          datalen: 0
        },
        straTime: {
          display: {
            en: "Time Found",
            zh: "發現時間"
          },
          requires: false,
          datatype: "time",
          datalen: 0
        },
        latiDegree: {
            requires: false,
            datatype: "int",
            datalen: 0
        },
        latiMinute: {
            requires: false,
            datatype: "int",
            datalen: 0
        },
        latiSecond: {
            requires: false,
            datatype: "decimal",
            datalen: 0
        },
        latiDirection: {
            requires: false,
            datatype: "char",
            datalen: 1
        },
        longDegree: {
            requires: false,
            datatype: "int",
            datalen: 0
        },
        longMinute: {
            requires: false,
            datatype: "int",
            datalen: 0
        },
        longSecond: {
            requires: false,
            datatype: "decimal",
            datalen: 0
        },
        longDirection: {
            requires: false,
            datatype: "char",
            datalen: 1
        },
        region: {
            display: {
              en: "Region",
              zh: "地區"
            },
            requires: false,
            datatype: "varchar",
            datalen: 30
        },
        location: {
            display: {
                en: "Location",
                zh: "位置"
            },
            requires: false,
            datatype: "varchar",
            datalen: 100
        },
        position: {
            display: {
              en: "Position",
              zh: "位置"
            },
            requires: false,
            datatype: "varchar",
            datalen: 100
        },
        ageClass: {
          display: {
            en: "Age Class",
            zh: "年齡類別"
          },
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        code: {
          display: {
            en: "Condition Code",
            zh: ""
          },
          requires: false,
          datatype: "char",
          datalen: 1
        },
        sex: {
          display: {
            en: "Gender",
            zh: "性別"
          },
          requires: false,
          datatype: "varchar",
          datalen: 3
        },
        length: {
          display: {
            en: "Length",
            zh: "長度"
          },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        weight: {
          display: {
            en: "Weight",
            zh: "重量"
          },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        personnel: {
          display: {
            en: "Personnel",
            zh: "相關人員"
          },
          requires: false,
          datatype: "varchar",
          datalen: 100
        },
        comments: {
          display: {
            en: "Comments",
            zh: "備注"
          },
          requires: false,
          datatype: "text",
          datalen: 65535
        },
        frozen: {
          display: {
            en: "Frozon",
            zh: "冷藏中"
          },
          requires: false,
          datatype: "varchar",
          datalen: 3
        },
        windDirection: {
          display: {
            en: "Wind Direction",
            zh: "風向"
          },
          requires: false,
          datatype: "varchar",
          datalen: 3
        },
        windSpeed: {
          display: {
            en: "Wind Speed",
            zh: "風速"
          },
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    morphometric: {
      info: {
        display: {
          en: "Morphometics (measurements in cm)",
          zh: "形態 （單位 cm）"
        },
        description:"Length of tip of Maxilla",
        subtitle:"Length of tip of Maxilla to ..."
      },
      columns: {
        m1: {
          display: {en: "1 - ANTERIOR MARGIN OF FLUKE NOTCH",zh: "尾鰭缺刻"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m2: {
          display: {en:"2 - POSTERIOR INSERTION OF DORSAL RIDGE",zh:"背嵴末端"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m2b: {
          display: {en:"2B- LAST TUBERCLE OF DORSAL RIDGE",zh:"背嵴最後疣粒，沿中線"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m3: {
          display: {en:"3 - ANTERIOR INSERTION OF DORSAL RIDGE",zh:"背嵴前端"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m3b: {
          display: {en:"3B- FIRST TUBERCLE OF DORSAL RIDGE",zh:"背嵴第一疣粒，沿中線"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m4: {
          display: {en:"4 - LEFT EAR",zh:"耳孔（左）"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m5: {
          display: { en:"5 - CENTRE OF BLOWHOLE ",zh:"呼吸孔中央，沿中線" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m6: {
          display: {en:"6 - POSTERIOR INSERTION OF GAPE",zh:"口裂末端"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m7: {
          display: {en:"7 - CENTRE OF LEFT EYE",zh:"眼中央（左）"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m8: {
          display: {en:"8 - ANTERIOR INSERTION OF LEFT FLIPPER",zh:"鰭肢前基（左）"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m9: {
          display: { en:"9 - CENTRE OF UMBILICUS",zh:"臍中點" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m10m: {
          display: { en:"10M- CENTRE OF GENITAL SLIT (MALE)",zh:"生殖孔中點（雄性）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m10f: {
          display: { en:"10F- CENTRE OF GENITAL SLIT (FEMALE)",zh:"生殖孔中點（雌性）"}, 
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m11: {
          display: {en:"11 - CENTRE OF ANUS",zh:"肛門中央" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m12: {
          display: {en:"12M- CENTRE OF PREANAL TUBULE (MALE)",zh:"肛門前方小孔（雄性）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    ridge: {
      info: {
        display: {
          en: "Ridge",
          zh: "背嵴"
        }
      },
      columns: {
        m14: {
          display: {en:"14 - ANTERIOR TO POSTERIOR INSERTION OF RIDGE",zh:"背嵴長"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m14b: {
          display: { en:"14B- FIRST TO LAST TUBERCLE",zh:"背嵴疣粒區長" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m15: {
          display: {en:"15 - SURFACE WIDTH OF RIDGE (WIDEST POINT)",zh:"背嵴最大寬度"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m16: {
          display: {en:"16 - HEIGHT OF RIDGE",zh:"背嵴高"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m16b: {
          display: {en:"16B - MAXIMUM ROWS OF TUBERCLES AT WIDEST POINT OF RIDGE",zh:"背嵴最寬處疣粒列數"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    girth: {
      info: {
        display: {
          en: "Girth",
          zh: "周長"
        }
      },
      columns: {
        m17: {
          display: {en:"17 - GIRTH AT EYE",zh:"眼位置體圍"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m18: {
          display: { en:"18 - GIRTH AT ANTERIOR INSERTION OF FLIPPER",zh:"鰭肢前基體圍" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m19: {
          display: { en:"19 - GIRTH AT AXILLA",zh:"腋下體圍" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m20: {
          display: { en:"20 - GIRTH MID-POINT BETWEEN AXILLA & UMBILICUS",zh:"腋下至臍之間中點體圍" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m21: {
          display: { en:"21 - GIRTH AT UMBILICUS",zh:"臍體圍" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m22m: {
          display: { en:"22 M - GIRTH AT GENITALIA (MALE)",zh:"生殖孔中央體圍（雄性）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m22f: {
          display: { en:"22 F - GIRTH AT GENITALIA (FEMALE)",zh:"生殖孔中央體圍（雌性）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m23: {
          display: { en:"23 - GIRTH AT ANUS",zh:"肛門處體圍" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    head: {
      info: {
        display: {
          en: "Head",
          zh: "頭部"
        }
      },
      columns: {
        m24: {
          display: { en:"24 - PROJECTION OF MELON BEYOND MAXILLA",zh:"上頜超過下頜長" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m25: {
          display: { en:"25 - POSTERIOR INSERTION OF GAPE TO CENTRE OF EYE",zh:"眼中央-口裂後端" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m26: {
          display: { en:"26 - LENGTH OF EYE",zh:"眼裂長" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m27: {
          display: { en:"27 - CENTRE OF EYE TO EAR",zh:"眼中央-耳孔" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m28: {
          display: { en:"28 - GAPE - MAXIMUM WIDTH AT POSTERIOR INSERTION",zh:"口裂最大寬度" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    flipper: {
      info: {
        display: {
          en: "Flipper",
          zh: "鰭狀肢"
        }
      },
      columns: {
        m29: {
          display: { en:"29 - FLIPPER TIP TO ANTERIOR INSERTION",zh:"鰭肢長，前基至稍端"  },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m30: {
          display: { en:"30 - FLIPPER TIP TO AXILLA (POSTERIOR INSERTION)",zh:"鰭肢長，腋下至稍端" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m31: {
          display: { en:"31 - FLIPPER MAXIMUM WIDTH",zh:"最大鰭肢寬" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m32: {
          display: { en:"32 - FLIPPER -ANTERIOR INSERTION TO AXILLA",zh:"鰭肢前基至腋下"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    fluke: {
      info: {
        display: {
          en: "Fluke",
          zh: "尾鰭"
        }
      },
      columns: {
        m33: {
          display: {en:"33 - FLUKE SPAN",zh:"尾鰭寬"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m34: {
          display: {en:"34 - NOTCH OF FLUKES TO ANTERIOR MARGAIN AT WIDEST POINT",zh:"尾鰭缺刻-尾鰭前緣最近點"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m35: {
          display: {en:"35 - FLUKE LENGTH - ANTERIOR MARGIN",zh:"尾鰭前緣長度"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m36: {
          display: {en:"36 - FLUKE LENGTH - POSTERIOR MARGIN",zh:"尾鰭後緣長度",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m37: {
          display: {en:"37 - FLUKE NOTCH DEPTH",zh:"尾鰭缺刻深度"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    blubber: {
      info: {
        display: {
          en: "Blubber",
          zh: "脂肪層"
        }
      },
      columns: {
        mA1: {
          display: {en:"A1 - BLUBBER THICKNESS (MID DORSAL)",zh:"脂肪層厚度（背中部）1"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mA2: {
          display: {en:"A2 - BLUBBER THICKNESS (LATERAL)",zh:"脂肪層厚度（體側中部）1", },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mA3: {
          display: {en:"A3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"脂肪層厚度（腹中部）1", },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mB1: {
          display: {en:"B1 - BLUBBER THICKNESS (MID DORSAL)",zh:"脂肪層厚度（背中部）2",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mB2: {
          display: {en:"B2 - BLUBBER THICKNESS (LATERAL)",zh:"脂肪層厚度（體側中部）2",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mB3: {
          display: { en:"B3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"脂肪層厚度（腹中部）2",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mC1: {
          display: {en:"C1 - BLUBBER THICKNESS (MID DORSAL)",zh:"脂肪層厚度（背中部）3",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mC2: {
          display: {en:"C2 - BLUBBER THICKNESS (LATERAL)",zh:"脂肪層厚度（體側中部）3", },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mC3: {
          display: {en:"C3 - BLUBBER THICKNESS (MID VENTRAL)",zh:"脂肪層厚度（腹中部）3",},
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    other: {
      info: {
        display: {
          en: "Other",
          zh: "其他數據"
        }
      },
      columns: {
        mUL: {
          display: {en:"UL - TOOTH COUNT - LEFT UPPERE",zh:"牙齒數目（上頜左側）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mLL: {
          display: {  en:"LL - TOOTH COUNT - LEFT LOWER",zh:"牙齒數目（下頜左側）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mUR: {
          display: { en:"UR - TOOTH COUNT - RIGHT UPPER",zh:"牙齒數目（上頜右側）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mLR: {
          display: { en:"LR - TOOTH COUNT - RIGHT LOWER",zh:"牙齒數目（下頜右側）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mLMSL: {
          display: { en:"LENGTH MAMMARY SLIT (LEFT)",zh:"乳溝長度（左）" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mLMSR: {
          display: { en:"LENGTH MAMMARY SLIT (RIGHT)",zh:"乳溝長度（右）"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        m13: {
          display: { en:"13 - GENITAL SLIT LENGTH",zh:"生殖孔長度"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mIWD: {
          display: { en:"INSIDE WIDTH / DIAMETER",zh:"肛門前方小孔之內徑長"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mD: {
          display: { en:"DEPTH",zh:"肛門前方小孔之深度" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        mLOO: {
          display: { en:"LENGTH OF OPENING",zh:"肛門前方小孔開口之長度" },
          requires: false,
          datatype: "decimal",
          datalen: 0
        }
      }
    },
    caseconclusion: {
      info: {
        display: {
          en: "Case Conclusion",
          zh: "總結/結論"
        }
      },
      columns: {
        comments: {
          display: { en: "Comments",zh: "評論" },
          requires: false,
          datatype: "text",
          datalen: 65535
        },
        COD: {
          display: {en: "Cause of Death",zh: "死亡原因"},
          requires: false,
          datatype: "varchar",
          datalen: 30
        },
        CODVerified: {
          display: {en: "Verified",zh: "已驗證"},
          requires: false,
          datatype: "varchar",
          datalen: 10
        }
      }
    },
    circulatory: {
      info: {
        display: {
          en: "Circulatory",zh: "心臟循環系統"
        }
      },
      columns: {
        pericardial: {
          display: {en: "Pericardial",zh: "心包"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        heart: {
          display: {en: "Heart",zh: "心"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    endocrine: {
      info: {
        display: {
          en: "Endocrine",zh: "內分泌"
        }
      },
      columns: {
        adreGlands: {
          display: { en: "Adrenal Glands",zh: "腎上腺" },
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        brain: {
          display: { en: "Brain",zh: "腦" },
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        pituGland: {
          display: { en: "Pituitary Gland",zh: "垂體腺" },
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    gastrointestinal: {
      info: {
        display: {
          en: "Gastrointestinal Tract",
          zh: "胃腸道"
        }
      },
      columns: {
        esophagus: {
          display: {en: "Esophagus",zh: "食管"},
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        stomach: {
          display: {en: "Stomach",zh: "胃"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        foreStomach: {
          display: {en: "Fore Stomach",zh: "前胃"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        fundStomach: {
          display: {en: "Foundational Stomach",zh: "基礎胃"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        pyloStomach: {
          display: {en: "Pylo Stomach",zh: "幽門胃"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        intestines: {
          display: {en: "Intestines",zh: "腸"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        liver: {
          display: {en: "Liver",zh: "肝"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        pancreas: {
          display: {en: "Pancreas",zh: "胰腺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    lymphatic: {
      info: {
        display: {en: "Lymphatic",zh: "淋巴"}
      },
      columns: {
        spleen: {
          display: {en: "Spleen",zh: "脾"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lympNodes: {
          display: {en: "Lymph Nodes",zh: "淋巴結"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    external: {
      info: {
        display: {
          en: "External",
          zh: "外觀"
        }
      },
      columns: {
        oBodyScore: {
          display: {en: "o Body Score",zh: ""},
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        cBodyScore: {
          display: {en: "c Body Score",zh: ""},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        wounds: {
          display: {en: "Wounds",zh: "傷口"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lesions: {
          display: {en: "Lesions",zh: "病變"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        parasites: {
          display: {en: "Parasites",zh: "寄生蟲"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        nostrils: {
          display: {en: "Nostrils",zh: "鼻孔"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        oralCavity: {
          display: {en: "Oral Cavity",zh: "口腔"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        tongue: {
          display: {en: "Tongue",zh: "舌頭"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        eyes: {
          display: {en: "Eyes",zh: "眼睛"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        ears: {
          display: {en: "Ears",zh: "耳朵"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        mammary: {
          display: {en: "Mammary",zh: "乳腺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        anus: {
          display: {en: "Anus",zh: "肛門"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    musculo: {
      info: {
        display: {
          en: "Musculo",
          zh: "肌肉"
        }
      },
      columns: {
        blubber: {
          display: { en: "Blubber",zh: "脂肪" },
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        muscle: {
          display: { en: "Muscle",zh: "肌肉" },
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    necropsyothers: {
      info: {
        display: {en: "Necropsy Others",zh: "屍檢"}
      },
      columns: {
        thorCavity: {
          display: {en: "ThorCavity",zh: ""},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        periCavity: {
          display: {en: "PeriCavity",zh: ""},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        thyroid: {
          display: {en: "Thyroid",zh: "甲狀腺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        parathyroid: {
          display: {en: "Parathyroid",zh: "甲狀旁腺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        thymus: {
          display: {en: "Thymus",zh: "胸腺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        sample: {
          display: {en: "sample",zh: "樣本"},
          requires: false,
          datatype: "varchar",
          datalen: 4000
        }
      }
    },
    necropsyrecord: {
      info: {
        display: {en: "Necropsy Record",zh: "屍檢記錄"}
      },
      columns: {
        sex: {
          display: {en: "Necropsy Record - Sex",zh: "屍檢記錄(性別)"},
          requires: false,
          datatype: "char",
          datalen: 1
        },
        ageClass: {
          display: {en: "Necropsy Record - Age",zh: "屍檢記錄(年齡)"},
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        code: {
          display: {en: "Necropsy Record - Condition Code",zh: "屍檢記錄(狀況)"},
          requires: false,
          datatype: "int",
          datalen: 0
        },
        necrDate: {
          display: {en: "Necropsy Record - Necropsy Date",zh: "屍檢記錄(日期)"},
          requires: false,
          datatype: "date",
          datalen: 0
        },
        COD: {
          display: {en: "Necropsy Record - Cause of Death",zh: "屍檢記錄(死因)"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        personnel: {
          display: {en: "Necropsy Record - Response Person",zh: "屍檢記錄(負責人)"},
          requires: false,
          datatype: "varchar",
          datalen: 100
        },
        length: {
          display: {en: "Necropsy Record - Length",zh: "屍檢記錄(長度)"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        weight: {
          display: {en: "Necropsy Record - Weight",zh: "屍檢記錄(重量)"},
          requires: false,
          datatype: "decimal",
          datalen: 0
        },
        comments: {
          display: {en: "Necropsy Record - Comments",zh: "屍檢記錄(備注)"},
          requires: false,
          datatype: "text",
          datalen: 65535
        }
      }
    },
    pulmonary: {
      info: {
        display: {
          en: "Pulmonary",
          zh: "肺部"
        }
      },
      columns: {
        trachea: {
          display: {en: "Trachea", zh: "氣管"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lungs: {
          display: {en: "Lungs", zh: "肺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        rLung: {
          display: {en: "Right Lung", zh: "右肺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lLung: {
          display: {en: "Left Lung", zh: "左肺"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        pharTonsils: {
          display: {en: "Tonsil", zh: "扁桃體"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        glottis: {
          display: {en: "Glottis", zh: "聲門"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    urinary: {
      info: {
        display: {
          display: {en: "Urinary", zh: "尿"}
        }
      },
      columns: {
        kidneys: {
          display: {en: "Kidneys", zh: "腎臟"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        rKidneys: {
          display: {en: "Right Kidneys", zh: "右腎"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lKidneys: {
          display: {en: "Left Kidneys", zh: "左腎"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        bladder: {
          display: {en: "Bladder", zh: "膀胱"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        testes: {
          display: {en: "Testes", zh: "睾丸"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        rTestes: {
          display: {en: "Right Testes", zh: "右睾丸"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        lTestes: {
          display: {en: "Left Testes", zh: "左睾丸"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        penis: {
          display: {en: "Penis", zh: "陰莖"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        skeletal: {
          display: {en: "Skeletal", zh: "骨骼"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        vertebrae: {
          display: {en: "Vertebrae", zh: "椎骨"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        joints: {
          display: {en: "Joints", zh: "關節"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        }
      }
    },
    virtopsy: {
      info: {
        display: {en: "Virtopsy", zh: "樣本掃描"},
      },
      columns: {
        scanDate: {
          display: {en: "Scan Date", zh: "掃描日期"},
          requires: false,
          datatype: "date",
          datalen: 0
        },
        scanTime: {
          display: {en: "Scan Time", zh: "掃描時間"},
          requires: false,
          datatype: "time",
          datalen: 0
        },
        COD: {
          display: {en: "Cause of Death", zh: "死因"},
          requires: false,
          datatype: "varchar",
          datalen: 200
        },
        personnel: {
          display: {en: "Personnel", zh: "負責人"},
          requires: false,
          datatype: "varchar",
          datalen: 100
        },
        code: {
          display: {en: "Condition Code", zh: "狀況"},
          requires: false,
          datatype: "char",
          datalen: 1
        },
        modaUsed: {
          display: {en: "Modal Used", zh: "掃描方式"},
          requires: false,
          datatype: "varchar",
          datalen: 30
        },
        comments: {
          display: {en: "Comments", zh: "備注"},
          requires: false,
          datatype: "text",
          datalen: 65535
        },
        dicomPath: {
          display: {en: "Dicom Path", zh: "CT掃描檔案"},
          requires: false,
          datatype: "varchar",
          datalen: 150
        },
        position: {
          display: {en: "Position", zh: "位置"},
          requires: false,
          datatype: "varchar",
          datalen: 400
        }
      }
    }
}

var userOBJ = {
    users: {
        info: {
          display: {


          }
        },
        columns: {
          uid: {
            display: {
  
  
            },
            requires: true,
            datatype: "varchar",
            datalen: 20
          },
          name: {
            display: {
  
  
            },
            requires: false,
            datatype: "varchar",
            datalen: 40
          },
          email: {
            display: {
  
  
            },
            requires: false,
            datatype: "varchar",
            datalen: 40
          },
          password: {
            display: {
  
  
            },
            requires: false,
            datatype: "char",
            datalen: 64
          },
          token: {
            display: {
  
  
            },
            requires: false,
            datatype: "varchar",
            datalen: 100
          },
          age: {
            display: {
  
  
            },
            requires: false,
            datatype: "int",
            datalen: 0
          },
          phonNumber: {
            display: {
  
  
            },
            requires: false,
            datatype: "varchar",
            datalen: 16
          },
          description: {
            display: {
  
  
            },
            requires: false,
            datatype: "varchar",
            datalen: 150
          },
          role: {
            display: {
  
  
            },
            requires: false,
            datatype: "char",
            datalen: 1
          },
          created_at: {
            display: {
  
  
            },
            requires: false,
            datatype: "timestamp",
            datalen: 0
          },
          updated_at: {
            display: {
  
  
            },
            requires: false,
            datatype: "timestamp",
            datalen: 0
          }
        }
      },
}


/*
    files: {
      info: {
        display: {
          en: "",
          zh: ""
        }
      },
      columns: {
        sid: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        md5: {
          display: {


          },
          requires: false,
          datatype: "char",
          datalen: 32
        },
        name: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 100
        },
        belong: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 30
        },
        organ: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 30
        },
        descrption: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 1000
        },
        extension: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 10
        },
        created_at: {
          display: {


          },
          requires: false,
          datatype: "timestamp",
          datalen: 0
        },
        updated_at: {
          display: {


          },
          requires: false,
          datatype: "timestamp",
          datalen: 0
        }
      }
    },
    md5: {
      info: {
        display: {
          en: "",
          zh: ""
        }
      },
      columns: {
        md5: {
          display: {


          },
          requires: true,
          datatype: "char",
          datalen: 32
        },
        url: {
          display: {


          },
          requires: false,
          datatype: "varchar",
          datalen: 120
        },
        created_at: {
          display: {


          },
          requires: false,
          datatype: "timestamp",
          datalen: 0
        },
        updated_at: {
          display: {


          },
          requires: false,
          datatype: "timestamp",
          datalen: 0
        }
      }
    },*/