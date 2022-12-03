let fake_articles = [
    {
      author_affiliation: [
        "University of Warsaw",
        "Facebook",
        "Salesforce.com",
        "University of Washington",
        "Nvidia",
        "Mario Negri Institute for Pharmacological Research",
        "University of Oxford",
        "ETH Zurich",
        "Stanford University",
        "Twitter",
        "Tsinghua University"
      ],
      authors: [
        {
          affiliation_id: "4654613",
          affiliation_name: "",
          affiliation_order: 1,
          author_id: "2411226248",
          author_name: "Adam Paszke",
          order: "1"
        },
        {
          affiliation_id: "4654613",
          affiliation_name: "",
          affiliation_order: 1,
          author_id: "2411226248",
          author_name: "Adam Paszke",
          order: "2"
        },
        {
          affiliation_id: "4654613",
          affiliation_name: "",
          affiliation_order: 1,
          author_id: "2411226248",
          author_name: "Adam Paszke",
          order: "3"
        },
      ],
      fields:[
        {
          "citation_count": 3383974,
          "field_id": "115903868",
          "level": 1,
          "main_type": "business.industry",
          "name": "Software engineering",
          "paper_count": 368585,
          "rank": 8347
        },
        {
          "citation_count": 3901149,
          "field_id": "136197465",
          "level": 2,
          "main_type": "",
          "name": "Variety (cybernetics)",
          "paper_count": 243478,
          "rank": 8507
        }],
      paper_id: "4cd223df721b722b1c40689caa52932a41fcc220",
      paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets Knowledge-rich, computer-assisted composition of Chinese couplets",
      abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
      citation_count: 3288,
      comment_count: 5,
      year:2021,
      reference_count: 42,
      is_collect:true,
      // 是否收藏
    },
    {
      authors: [
        {
          author_name: "John Lee",
          ids: [
            "3362353",
          ]
        },
        {
          author_name: "Zuo_zuo",
          ids: [
            "19373260",
          ]
        },
      ],
      fields:[
        {
          "citation_count": 3383974,
          "field_id": "115903868",
          "level": 1,
          "main_type": "business.industry",
          "name": "Software engineering",
          "paper_count": 368585,
          "rank": 8347
        },
        {
          "citation_count": 3901149,
          "field_id": "136197465",
          "level": 2,
          "main_type": "",
          "name": "Variety (cybernetics)",
          "paper_count": 243478,
          "rank": 8507
        }],
      paper_id: "4cd223df721b722b1c40689caa52932a41fcc221",
      paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
      abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
      citation_count: 3288,
      comment_count: 5,
      year:2021,
      reference_count: 42,
      is_collect:true,
      // 是否收藏
    },
    {
      authors: [
        {
          author_name: "John Lee",
          ids: [
            "3362353",
          ]
        },
        {
          author_name: "Zuo_zuo",
          ids: [
            "19373260",
          ]
        },
      ],
      fields:[
        {
          "citation_count": 3383974,
          "field_id": "115903868",
          "level": 1,
          "main_type": "business.industry",
          "name": "Software engineering",
          "paper_count": 368585,
          "rank": 8347
        },
        {
          "citation_count": 3901149,
          "field_id": "136197465",
          "level": 2,
          "main_type": "",
          "name": "Variety (cybernetics)",
          "paper_count": 243478,
          "rank": 8507
        }],
      paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
      paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
      abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
      citation_count: 3288,
      comment_count: 5,
      year:2021,
      reference_count: 42,
      is_collect:true,
      // 是否收藏
    }
  ]

  let fake_aggregation = {
    max_year: 2022,
    min_year: 2009,
    conference: [
      {
        citation_count: 384,
        conference_id: "3083037350",
        count: 8,
        end: "2021-05-29",
        id: "3083037350",
        location: "Madrid, Spain",
        name: "ICSE 2021",
        offical_url: "https://conf.researchr.org/home/icse-2021",
        paper_count: 471,
        start: "2021-05-23"
      },
      {
        citation_count: 3246,
        conference_id: "71090686",
        count: 8,
        end: "2014-06-01",
        id: "71090686",
        location: "Hyderabad, India",
        name: "MSR 2014",
        offical_url: "http://2014.msrconf.org/",
        paper_count: 63,
        start: "2014-05-31"
      },],
    doctype: [
      {
        "Conference": 286
      },
      {
        "Journal": 170
      },
      {
        "Repository": 144
      },
      {
        "Thesis": 26
      },
      {
        "Patent": 12
      }
    ],
    journal: [
      {
        citation_count: "19256",
        count: 78,
        issn: "",
        id: "2595428313",
        journal_id: "2595428313",
        name: "arXiv: Software Engineering",
        paper_count: "7794",
        publisher: "",
        rank: "10353",
        webpage: ""
      },
      {
        citation_count: "34541",
        count: 17,
        issn: "",
        id: "2595428313",
        journal_id: "2595804992",
        name: "arXiv: Social and Information Networks",
        paper_count: "7232",
        publisher: "",
        rank: "10327",
        webpage: ""
      },
    ],
    publisher: [
      {
        "IEEE": 13
      },
      {
        "Apress, Berkeley, CA": 8
      },
      {
        "IOP Publishing": 7
      },
      {
        "ACM": 5
      },
      {
        "The Open Journal": 4
      },
      {
        "Elsevier BV": 3
      },
      {
        "Github": 3
      },
      {
        "Packt Publishing": 3
      },
      {
        "Apress": 2
      }
    ]
  }

let fake_fetch = new Promise(function(resolve,reject){
    let res = {
        data:{
            status:200,
            aggregation:fake_aggregation,
            total_hits:3,
            details:fake_articles,
        }
    }
    resolve(res)
})

export {fake_articles,fake_fetch,fake_aggregation}