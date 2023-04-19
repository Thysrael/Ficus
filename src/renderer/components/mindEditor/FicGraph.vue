<template>
  <div style="width: 100%; height: 100%" id="main"></div>
</template>

<script>
import * as echarts from './assets/echarts.min'
import ficus from './assets/ficus.json'
export default {
  name: 'FicGraph',
  mounted () {
    /* eslint-disable */
    echarts.registerTheme('ficus', ficus);
    const myChart = echarts.init(document.getElementById('main'), 'ficus');
    const option = {
      title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [
        {
          data: [
            '类目0',
            '类目1',
            '类目2',
            '类目3',
            '类目4',
            '类目5',
            '类目6',
            '类目7',
            '类目8'
          ]
        }
      ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          roam: true,
          data: [
            {
              id: '0',
              name: 'Myriel',
              symbolSize: 19.12381,
              x: -53.365552,
              y: 59.93808,
              value: 28.685715,
              category: 0
            },
            {
              id: '1',
              name: 'Napoleon',
              symbolSize: 2.6666666666666665,
              x: -83.616688,
              y: 89.37706,
              value: 4,
              category: 0
            },
            {
              id: '2',
              name: 'MlleBaptistine',
              symbolSize: 6.323809333333333,
              x: -42.552713999999995,
              y: 49.058352,
              value: 9.485714,
              category: 1
            },
            {
              id: '3',
              name: 'MmeMagloire',
              symbolSize: 6.323809333333333,
              x: -48.564808,
              y: 47.052566,
              value: 9.485714,
              category: 1
            },
            {
              id: '4',
              name: 'CountessDeLo',
              symbolSize: 2.6666666666666665,
              x: -75.860772,
              y: 85.812848,
              value: 4,
              category: 0
            },
            {
              id: '5',
              name: 'Geborand',
              symbolSize: 2.6666666666666665,
              x: -83.452674,
              y: 81.20701199999999,
              value: 4,
              category: 0
            },
            {
              id: '6',
              name: 'Champtercier',
              symbolSize: 2.6666666666666665,
              x: -66.52024,
              y: 97.033948,
              value: 4,
              category: 0
            },
            {
              id: '7',
              name: 'Cravatte',
              symbolSize: 2.6666666666666665,
              x: -76.539136,
              y: 95.018226,
              value: 4,
              category: 0
            },
            {
              id: '8',
              name: 'Count',
              symbolSize: 2.6666666666666665,
              x: -64.0768,
              y: 77.43465,
              value: 4,
              category: 0
            },
            {
              id: '9',
              name: 'OldMan',
              symbolSize: 2.6666666666666665,
              x: -68.879664,
              y: 90.233544,
              value: 4,
              category: 0
            },
            {
              id: '10',
              name: 'Labarre',
              symbolSize: 2.6666666666666665,
              x: -17.868214000000002,
              y: 46.912256,
              value: 4,
              category: 1
            },
            {
              id: '11',
              name: 'Valjean',
              symbolSize: 66.66666666666667,
              x: 0,
              y: 0,
              value: 100,
              category: 1
            },
            {
              id: '12',
              name: 'Marguerite',
              symbolSize: 4.495239333333333,
              x: -67.955816,
              y: -36.938278000000004,
              value: 6.742859,
              category: 1
            },
            {
              id: '13',
              name: 'MmeDeR',
              symbolSize: 2.6666666666666665,
              x: -38.862626,
              y: 35.710602,
              value: 4,
              category: 1
            },
            {
              id: '14',
              name: 'Isabeau',
              symbolSize: 2.6666666666666665,
              x: -31.610336,
              y: 40.399536,
              value: 4,
              category: 1
            },
            {
              id: '15',
              name: 'Gervais',
              symbolSize: 2.6666666666666665,
              x: -25.5403092,
              y: 48.510114,
              value: 4,
              category: 1
            },
            {
              id: '16',
              name: 'Tholomyes',
              symbolSize: 17.295237333333333,
              x: -77.04452,
              y: -78.71144000000001,
              value: 25.942856,
              category: 2
            },
            {
              id: '17',
              name: 'Listolier',
              symbolSize: 13.638097333333334,
              x: -103.311768,
              y: -78.79795,
              value: 20.457146,
              category: 2
            },
            {
              id: '18',
              name: 'Fameuil',
              symbolSize: 13.638097333333334,
              x: -92.958764,
              y: -98.71588799999999,
              value: 20.457146,
              category: 2
            },
            {
              id: '19',
              name: 'Blacheville',
              symbolSize: 13.638097333333334,
              x: -103.03248,
              y: -91.39782,
              value: 20.457146,
              category: 2
            },
            {
              id: '20',
              name: 'Favourite',
              symbolSize: 13.638097333333334,
              x: -81.624244,
              y: -92.90096,
              value: 20.457146,
              category: 2
            },
            {
              id: '21',
              name: 'Dahlia',
              symbolSize: 13.638097333333334,
              x: -91.288226,
              y: -85.026606,
              value: 20.457146,
              category: 2
            },
            {
              id: '22',
              name: 'Zephine',
              symbolSize: 13.638097333333334,
              x: -91.82214,
              y: -72.50266,
              value: 20.457146,
              category: 2
            },
            {
              id: '23',
              name: 'Fantine',
              symbolSize: 28.266666666666666,
              x: -62.685572,
              y: -57.889606,
              value: 42.4,
              category: 2
            },
            {
              id: '24',
              name: 'MmeThenardier',
              symbolSize: 20.95238266666667,
              x: 0.9262679199999999,
              y: -54.77034,
              value: 31.428574,
              category: 7
            },
            {
              id: '25',
              name: 'Thenardier',
              symbolSize: 30.095235333333335,
              x: 16.56165,
              y: -40.622879999999995,
              value: 45.142853,
              category: 7
            },
            {
              id: '26',
              name: 'Cosette',
              symbolSize: 20.95238266666667,
              x: 15.729292000000001,
              y: -6.3025494,
              value: 31.428574,
              category: 6
            },
            {
              id: '27',
              name: 'Javert',
              symbolSize: 31.923806666666668,
              x: -16.292148,
              y: -40.840408000000004,
              value: 47.88571,
              category: 7
            },
            {
              id: '28',
              name: 'Fauchelevent',
              symbolSize: 8.152382000000001,
              x: -45.147968,
              y: 16.483262,
              value: 12.228573,
              category: 4
            },
            {
              id: '29',
              name: 'Bamatabois',
              symbolSize: 15.466666666666667,
              x: -77.13683999999999,
              y: -4.0413372,
              value: 23.2,
              category: 3
            },
            {
              id: '30',
              name: 'Perpetue',
              symbolSize: 4.495239333333333,
              x: -80.784894,
              y: -39.539646,
              value: 6.742859,
              category: 2
            },
            {
              id: '31',
              name: 'Simplice',
              symbolSize: 8.152382000000001,
              x: -56.28506,
              y: -31.690274,
              value: 12.228573,
              category: 2
            },
            {
              id: '32',
              name: 'Scaufflaire',
              symbolSize: 2.6666666666666665,
              x: -24.482696,
              y: 42.075006,
              value: 4,
              category: 1
            },
            {
              id: '33',
              name: 'Woman1',
              symbolSize: 4.495239333333333,
              x: -46.92002,
              y: -22.630134,
              value: 6.742859,
              category: 1
            },
            {
              id: '34',
              name: 'Judge',
              symbolSize: 11.809524666666666,
              x: -77.56983,
              y: 11.74118,
              value: 17.714287,
              category: 3
            },
            {
              id: '35',
              name: 'Champmathieu',
              symbolSize: 11.809524666666666,
              x: -67.64614,
              y: 17.49681,
              value: 17.714287,
              category: 3
            },
            {
              id: '36',
              name: 'Brevet',
              symbolSize: 11.809524666666666,
              x: -90.653748,
              y: 11.789296,
              value: 17.714287,
              category: 3
            },
            {
              id: '37',
              name: 'Chenildieu',
              symbolSize: 11.809524666666666,
              x: -77.28980800000001,
              y: 28.011874,
              value: 17.714287,
              category: 3
            },
            {
              id: '38',
              name: 'Cochepaille',
              symbolSize: 11.809524666666666,
              x: -89.35752,
              y: 24.676009999999998,
              value: 17.714287,
              category: 3
            },
            {
              id: '39',
              name: 'Pontmercy',
              symbolSize: 6.323809333333333,
              x: 67.299476,
              y: -53.911828,
              value: 9.485714,
              category: 6
            },
            {
              id: '40',
              name: 'Boulatruelle',
              symbolSize: 2.6666666666666665,
              x: 5.8375686,
              y: -92.026264,
              value: 4,
              category: 7
            },
            {
              id: '41',
              name: 'Eponine',
              symbolSize: 20.95238266666667,
              x: 47.673394,
              y: -42.001852,
              value: 31.428574,
              category: 7
            },
            {
              id: '42',
              name: 'Anzelma',
              symbolSize: 6.323809333333333,
              x: 37.939026,
              y: -69.301324,
              value: 9.485714,
              category: 7
            },
            {
              id: '43',
              name: 'Woman2',
              symbolSize: 6.323809333333333,
              x: -37.400836,
              y: -29.005326000000004,
              value: 9.485714,
              category: 6
            },
            {
              id: '44',
              name: 'MotherInnocent',
              symbolSize: 4.495239333333333,
              x: -50.599042,
              y: 25.975098000000003,
              value: 6.742859,
              category: 4
            },
            {
              id: '45',
              name: 'Gribier',
              symbolSize: 2.6666666666666665,
              x: -59.215869999999995,
              y: 32.623928,
              value: 4,
              category: 4
            },
            {
              id: '46',
              name: 'Jondrette',
              symbolSize: 2.6666666666666665,
              x: 110.06402,
              y: 104.48062,
              value: 4,
              category: 5
            },
            {
              id: '47',
              name: 'MmeBurgon',
              symbolSize: 4.495239333333333,
              x: 97.62707,
              y: 71.37146,
              value: 6.742859,
              category: 5
            },
            {
              id: '48',
              name: 'Gavroche',
              symbolSize: 41.06667066666667,
              x: 77.579144,
              y: 22.0924652,
              value: 61.600006,
              category: 8
            },
            {
              id: '49',
              name: 'Gillenormand',
              symbolSize: 13.638097333333334,
              x: 25.296619999999997,
              y: 13.621243999999999,
              value: 20.457146,
              category: 6
            },
            {
              id: '50',
              name: 'Magnon',
              symbolSize: 4.495239333333333,
              x: 25.41473,
              y: -22.611846,
              value: 6.742859,
              category: 6
            },
            {
              id: '51',
              name: 'MlleGillenormand',
              symbolSize: 13.638097333333334,
              x: 32.527118,
              y: 23.531299999999998,
              value: 20.457146,
              category: 6
            },
            {
              id: '52',
              name: 'MmePontmercy',
              symbolSize: 4.495239333333333,
              x: 70.73283,
              y: -41.17833,
              value: 6.742859,
              category: 6
            },
            {
              id: '53',
              name: 'MlleVaubois',
              symbolSize: 2.6666666666666665,
              x: 33.087878,
              y: 67.95472,
              value: 4,
              category: 6
            },
            {
              id: '54',
              name: 'LtGillenormand',
              symbolSize: 8.152382000000001,
              x: 27.538695999999998,
              y: 39.221379999999996,
              value: 12.228573,
              category: 6
            },
            {
              id: '55',
              name: 'Marius',
              symbolSize: 35.58095333333333,
              x: 41.289373999999995,
              y: -2.7610821999999997,
              value: 53.37143,
              category: 6
            },
            {
              id: '56',
              name: 'BaronessT',
              symbolSize: 4.495239333333333,
              x: 38.965986,
              y: 44.956072,
              value: 6.742859,
              category: 6
            },
            {
              id: '57',
              name: 'Mabeuf',
              symbolSize: 20.95238266666667,
              x: 119.53236,
              y: 27.036962,
              value: 31.428574,
              category: 8
            },
            {
              id: '58',
              name: 'Enjolras',
              symbolSize: 28.266666666666666,
              x: 71.156732,
              y: -14.976490799999999,
              value: 42.4,
              category: 8
            },
            {
              id: '59',
              name: 'Combeferre',
              symbolSize: 20.95238266666667,
              x: 103.05922000000001,
              y: -9.2335128,
              value: 31.428574,
              category: 8
            },
            {
              id: '60',
              name: 'Prouvaire',
              symbolSize: 17.295237333333333,
              x: 122.85857000000001,
              y: -13.86208,
              value: 25.942856,
              category: 8
            },
            {
              id: '61',
              name: 'Feuilly',
              symbolSize: 20.95238266666667,
              x: 110.03833999999999,
              y: -25.635073999999996,
              value: 31.428574,
              category: 8
            },
            {
              id: '62',
              name: 'Courfeyrac',
              symbolSize: 24.609526666666667,
              x: 87.23436799999999,
              y: -2.5457365,
              value: 36.91429,
              category: 8
            },
            {
              id: '63',
              name: 'Bahorel',
              symbolSize: 22.780953333333333,
              x: 120.51044999999999,
              y: 3.2842854000000004,
              value: 34.17143,
              category: 8
            },
            {
              id: '64',
              name: 'Bossuet',
              symbolSize: 24.609526666666667,
              x: 91.16391,
              y: -23.091652,
              value: 36.91429,
              category: 8
            },
            {
              id: '65',
              name: 'Joly',
              symbolSize: 22.780953333333333,
              x: 103.281568,
              y: 9.4484466,
              value: 34.17143,
              category: 8
            },
            {
              id: '66',
              name: 'Grantaire',
              symbolSize: 19.12381,
              x: 129.28626,
              y: -30.212662,
              value: 28.685715,
              category: 8
            },
            {
              id: '67',
              name: 'MotherPlutarch',
              symbolSize: 2.6666666666666665,
              x: 133.79136,
              y: 40.930976,
              value: 4,
              category: 8
            },
            {
              id: '68',
              name: 'Gueulemer',
              symbolSize: 19.12381,
              x: 15.69598,
              y: -69.430292,
              value: 28.685715,
              category: 7
            },
            {
              id: '69',
              name: 'Babet',
              symbolSize: 19.12381,
              x: 30.071918,
              y: -59.701594,
              value: 28.685715,
              category: 7
            },
            {
              id: '70',
              name: 'Claquesous',
              symbolSize: 19.12381,
              x: 27.47434,
              y: -82.05618,
              value: 28.685715,
              category: 7
            },
            {
              id: '71',
              name: 'Montparnasse',
              symbolSize: 17.295237333333333,
              x: 46.975494,
              y: -80.171966,
              value: 25.942856,
              category: 7
            },
            {
              id: '72',
              name: 'Toussaint',
              symbolSize: 6.323809333333333,
              x: 8.1884506,
              y: 22.756543999999998,
              value: 9.485714,
              category: 1
            },
            {
              id: '73',
              name: 'Child1',
              symbolSize: 4.495239333333333,
              x: 87.5878,
              y: 58.316468,
              value: 6.742859,
              category: 8
            },
            {
              id: '74',
              name: 'Child2',
              symbolSize: 4.495239333333333,
              x: 93.209844,
              y: 56.67211999999999,
              value: 6.742859,
              category: 8
            },
            {
              id: '75',
              name: 'Brujon',
              symbolSize: 13.638097333333334,
              x: 47.758728000000005,
              y: -62.812689999999996,
              value: 20.457146,
              category: 7
            },
            {
              id: '76',
              name: 'MmeHucheloup',
              symbolSize: 13.638097333333334,
              x: 142.43670600000002,
              y: 0.9626298999999999,
              value: 20.457146,
              category: 8
            }
          ],
          links: [
            {
              id: '0',
              source: '1',
              target: '0'
            },
            {
              id: '1',
              source: '2',
              target: '0'
            },
            {
              id: '2',
              source: '3',
              target: '0'
            },
            {
              id: '3',
              source: '3',
              target: '2'
            },
            {
              id: '4',
              source: '4',
              target: '0'
            },
            {
              id: '5',
              source: '5',
              target: '0'
            },
            {
              id: '6',
              source: '6',
              target: '0'
            },
            {
              id: '7',
              source: '7',
              target: '0'
            },
            {
              id: '8',
              source: '8',
              target: '0'
            },
            {
              id: '9',
              source: '9',
              target: '0'
            },
            {
              id: '13',
              source: '11',
              target: '0'
            },
            {
              id: null,
              source: '11',
              target: '2'
            },
            {
              id: '11',
              source: '11',
              target: '3'
            },
            {
              id: '10',
              source: '11',
              target: '10'
            },
            {
              id: '14',
              source: '12',
              target: '11'
            },
            {
              id: '15',
              source: '13',
              target: '11'
            },
            {
              id: '16',
              source: '14',
              target: '11'
            },
            {
              id: '17',
              source: '15',
              target: '11'
            },
            {
              id: '18',
              source: '17',
              target: '16'
            },
            {
              id: '19',
              source: '18',
              target: '16'
            },
            {
              id: '20',
              source: '18',
              target: '17'
            },
            {
              id: '21',
              source: '19',
              target: '16'
            },
            {
              id: '22',
              source: '19',
              target: '17'
            },
            {
              id: '23',
              source: '19',
              target: '18'
            },
            {
              id: '24',
              source: '20',
              target: '16'
            },
            {
              id: '25',
              source: '20',
              target: '17'
            },
            {
              id: '26',
              source: '20',
              target: '18'
            },
            {
              id: '27',
              source: '20',
              target: '19'
            },
            {
              id: '28',
              source: '21',
              target: '16'
            },
            {
              id: '29',
              source: '21',
              target: '17'
            },
            {
              id: '30',
              source: '21',
              target: '18'
            },
            {
              id: '31',
              source: '21',
              target: '19'
            },
            {
              id: '32',
              source: '21',
              target: '20'
            },
            {
              id: '33',
              source: '22',
              target: '16'
            },
            {
              id: '34',
              source: '22',
              target: '17'
            },
            {
              id: '35',
              source: '22',
              target: '18'
            },
            {
              id: '36',
              source: '22',
              target: '19'
            },
            {
              id: '37',
              source: '22',
              target: '20'
            },
            {
              id: '38',
              source: '22',
              target: '21'
            },
            {
              id: '47',
              source: '23',
              target: '11'
            },
            {
              id: '46',
              source: '23',
              target: '12'
            },
            {
              id: '39',
              source: '23',
              target: '16'
            },
            {
              id: '40',
              source: '23',
              target: '17'
            },
            {
              id: '41',
              source: '23',
              target: '18'
            },
            {
              id: '42',
              source: '23',
              target: '19'
            },
            {
              id: '43',
              source: '23',
              target: '20'
            },
            {
              id: '44',
              source: '23',
              target: '21'
            },
            {
              id: '45',
              source: '23',
              target: '22'
            },
            {
              id: null,
              source: '24',
              target: '11'
            },
            {
              id: '48',
              source: '24',
              target: '23'
            },
            {
              id: '52',
              source: '25',
              target: '11'
            },
            {
              id: '51',
              source: '25',
              target: '23'
            },
            {
              id: '50',
              source: '25',
              target: '24'
            },
            {
              id: null,
              source: '26',
              target: '11'
            },
            {
              id: null,
              source: '26',
              target: '16'
            },
            {
              id: '53',
              source: '26',
              target: '24'
            },
            {
              id: '56',
              source: '26',
              target: '25'
            },
            {
              id: '57',
              source: '27',
              target: '11'
            },
            {
              id: '58',
              source: '27',
              target: '23'
            },
            {
              id: null,
              source: '27',
              target: '24'
            },
            {
              id: '59',
              source: '27',
              target: '25'
            },
            {
              id: '61',
              source: '27',
              target: '26'
            },
            {
              id: '62',
              source: '28',
              target: '11'
            },
            {
              id: '63',
              source: '28',
              target: '27'
            },
            {
              id: '66',
              source: '29',
              target: '11'
            },
            {
              id: '64',
              source: '29',
              target: '23'
            },
            {
              id: '65',
              source: '29',
              target: '27'
            },
            {
              id: '67',
              source: '30',
              target: '23'
            },
            {
              id: null,
              source: '31',
              target: '11'
            },
            {
              id: null,
              source: '31',
              target: '23'
            },
            {
              id: null,
              source: '31',
              target: '27'
            },
            {
              id: '68',
              source: '31',
              target: '30'
            },
            {
              id: '72',
              source: '32',
              target: '11'
            },
            {
              id: '73',
              source: '33',
              target: '11'
            },
            {
              id: '74',
              source: '33',
              target: '27'
            },
            {
              id: '75',
              source: '34',
              target: '11'
            },
            {
              id: '76',
              source: '34',
              target: '29'
            },
            {
              id: '77',
              source: '35',
              target: '11'
            },
            {
              id: null,
              source: '35',
              target: '29'
            },
            {
              id: '78',
              source: '35',
              target: '34'
            },
            {
              id: '82',
              source: '36',
              target: '11'
            },
            {
              id: '83',
              source: '36',
              target: '29'
            },
            {
              id: '80',
              source: '36',
              target: '34'
            },
            {
              id: '81',
              source: '36',
              target: '35'
            },
            {
              id: '87',
              source: '37',
              target: '11'
            },
            {
              id: '88',
              source: '37',
              target: '29'
            },
            {
              id: '84',
              source: '37',
              target: '34'
            },
            {
              id: '85',
              source: '37',
              target: '35'
            },
            {
              id: '86',
              source: '37',
              target: '36'
            },
            {
              id: '93',
              source: '38',
              target: '11'
            },
            {
              id: '94',
              source: '38',
              target: '29'
            },
            {
              id: '89',
              source: '38',
              target: '34'
            },
            {
              id: '90',
              source: '38',
              target: '35'
            },
            {
              id: '91',
              source: '38',
              target: '36'
            },
            {
              id: '92',
              source: '38',
              target: '37'
            },
            {
              id: '95',
              source: '39',
              target: '25'
            },
            {
              id: '96',
              source: '40',
              target: '25'
            },
            {
              id: '97',
              source: '41',
              target: '24'
            },
            {
              id: '98',
              source: '41',
              target: '25'
            },
            {
              id: '101',
              source: '42',
              target: '24'
            },
            {
              id: '100',
              source: '42',
              target: '25'
            },
            {
              id: '99',
              source: '42',
              target: '41'
            },
            {
              id: '102',
              source: '43',
              target: '11'
            },
            {
              id: '103',
              source: '43',
              target: '26'
            },
            {
              id: '104',
              source: '43',
              target: '27'
            },
            {
              id: null,
              source: '44',
              target: '11'
            },
            {
              id: '105',
              source: '44',
              target: '28'
            },
            {
              id: '107',
              source: '45',
              target: '28'
            },
            {
              id: '108',
              source: '47',
              target: '46'
            },
            {
              id: '112',
              source: '48',
              target: '11'
            },
            {
              id: '110',
              source: '48',
              target: '25'
            },
            {
              id: '111',
              source: '48',
              target: '27'
            },
            {
              id: '109',
              source: '48',
              target: '47'
            },
            {
              id: null,
              source: '49',
              target: '11'
            },
            {
              id: '113',
              source: '49',
              target: '26'
            },
            {
              id: null,
              source: '50',
              target: '24'
            },
            {
              id: '115',
              source: '50',
              target: '49'
            },
            {
              id: '119',
              source: '51',
              target: '11'
            },
            {
              id: '118',
              source: '51',
              target: '26'
            },
            {
              id: '117',
              source: '51',
              target: '49'
            },
            {
              id: null,
              source: '52',
              target: '39'
            },
            {
              id: '120',
              source: '52',
              target: '51'
            },
            {
              id: '122',
              source: '53',
              target: '51'
            },
            {
              id: '125',
              source: '54',
              target: '26'
            },
            {
              id: '124',
              source: '54',
              target: '49'
            },
            {
              id: '123',
              source: '54',
              target: '51'
            },
            {
              id: '131',
              source: '55',
              target: '11'
            },
            {
              id: '132',
              source: '55',
              target: '16'
            },
            {
              id: '133',
              source: '55',
              target: '25'
            },
            {
              id: null,
              source: '55',
              target: '26'
            },
            {
              id: '128',
              source: '55',
              target: '39'
            },
            {
              id: '134',
              source: '55',
              target: '41'
            },
            {
              id: '135',
              source: '55',
              target: '48'
            },
            {
              id: '127',
              source: '55',
              target: '49'
            },
            {
              id: '126',
              source: '55',
              target: '51'
            },
            {
              id: '129',
              source: '55',
              target: '54'
            },
            {
              id: '136',
              source: '56',
              target: '49'
            },
            {
              id: '137',
              source: '56',
              target: '55'
            },
            {
              id: null,
              source: '57',
              target: '41'
            },
            {
              id: null,
              source: '57',
              target: '48'
            },
            {
              id: '138',
              source: '57',
              target: '55'
            },
            {
              id: '145',
              source: '58',
              target: '11'
            },
            {
              id: null,
              source: '58',
              target: '27'
            },
            {
              id: '142',
              source: '58',
              target: '48'
            },
            {
              id: '141',
              source: '58',
              target: '55'
            },
            {
              id: '144',
              source: '58',
              target: '57'
            },
            {
              id: '148',
              source: '59',
              target: '48'
            },
            {
              id: '147',
              source: '59',
              target: '55'
            },
            {
              id: null,
              source: '59',
              target: '57'
            },
            {
              id: '146',
              source: '59',
              target: '58'
            },
            {
              id: '150',
              source: '60',
              target: '48'
            },
            {
              id: '151',
              source: '60',
              target: '58'
            },
            {
              id: '152',
              source: '60',
              target: '59'
            },
            {
              id: '153',
              source: '61',
              target: '48'
            },
            {
              id: '158',
              source: '61',
              target: '55'
            },
            {
              id: '157',
              source: '61',
              target: '57'
            },
            {
              id: '154',
              source: '61',
              target: '58'
            },
            {
              id: '156',
              source: '61',
              target: '59'
            },
            {
              id: '155',
              source: '61',
              target: '60'
            },
            {
              id: '164',
              source: '62',
              target: '41'
            },
            {
              id: '162',
              source: '62',
              target: '48'
            },
            {
              id: '159',
              source: '62',
              target: '55'
            },
            {
              id: null,
              source: '62',
              target: '57'
            },
            {
              id: '160',
              source: '62',
              target: '58'
            },
            {
              id: '161',
              source: '62',
              target: '59'
            },
            {
              id: null,
              source: '62',
              target: '60'
            },
            {
              id: '165',
              source: '62',
              target: '61'
            },
            {
              id: null,
              source: '63',
              target: '48'
            },
            {
              id: '174',
              source: '63',
              target: '55'
            },
            {
              id: null,
              source: '63',
              target: '57'
            },
            {
              id: null,
              source: '63',
              target: '58'
            },
            {
              id: '167',
              source: '63',
              target: '59'
            },
            {
              id: null,
              source: '63',
              target: '60'
            },
            {
              id: '172',
              source: '63',
              target: '61'
            },
            {
              id: '169',
              source: '63',
              target: '62'
            },
            {
              id: '184',
              source: '64',
              target: '11'
            },
            {
              id: null,
              source: '64',
              target: '48'
            },
            {
              id: '175',
              source: '64',
              target: '55'
            },
            {
              id: '183',
              source: '64',
              target: '57'
            },
            {
              id: '179',
              source: '64',
              target: '58'
            },
            {
              id: '182',
              source: '64',
              target: '59'
            },
            {
              id: '181',
              source: '64',
              target: '60'
            },
            {
              id: '180',
              source: '64',
              target: '61'
            },
            {
              id: '176',
              source: '64',
              target: '62'
            },
            {
              id: '178',
              source: '64',
              target: '63'
            },
            {
              id: '187',
              source: '65',
              target: '48'
            },
            {
              id: '194',
              source: '65',
              target: '55'
            },
            {
              id: '193',
              source: '65',
              target: '57'
            },
            {
              id: null,
              source: '65',
              target: '58'
            },
            {
              id: '192',
              source: '65',
              target: '59'
            },
            {
              id: null,
              source: '65',
              target: '60'
            },
            {
              id: '190',
              source: '65',
              target: '61'
            },
            {
              id: '188',
              source: '65',
              target: '62'
            },
            {
              id: '185',
              source: '65',
              target: '63'
            },
            {
              id: '186',
              source: '65',
              target: '64'
            },
            {
              id: '200',
              source: '66',
              target: '48'
            },
            {
              id: '196',
              source: '66',
              target: '58'
            },
            {
              id: '197',
              source: '66',
              target: '59'
            },
            {
              id: '203',
              source: '66',
              target: '60'
            },
            {
              id: '202',
              source: '66',
              target: '61'
            },
            {
              id: '198',
              source: '66',
              target: '62'
            },
            {
              id: '201',
              source: '66',
              target: '63'
            },
            {
              id: '195',
              source: '66',
              target: '64'
            },
            {
              id: '199',
              source: '66',
              target: '65'
            },
            {
              id: '204',
              source: '67',
              target: '57'
            },
            {
              id: null,
              source: '68',
              target: '11'
            },
            {
              id: null,
              source: '68',
              target: '24'
            },
            {
              id: '205',
              source: '68',
              target: '25'
            },
            {
              id: '208',
              source: '68',
              target: '27'
            },
            {
              id: null,
              source: '68',
              target: '41'
            },
            {
              id: '209',
              source: '68',
              target: '48'
            },
            {
              id: '213',
              source: '69',
              target: '11'
            },
            {
              id: '214',
              source: '69',
              target: '24'
            },
            {
              id: '211',
              source: '69',
              target: '25'
            },
            {
              id: null,
              source: '69',
              target: '27'
            },
            {
              id: '217',
              source: '69',
              target: '41'
            },
            {
              id: '216',
              source: '69',
              target: '48'
            },
            {
              id: '212',
              source: '69',
              target: '68'
            },
            {
              id: '221',
              source: '70',
              target: '11'
            },
            {
              id: '222',
              source: '70',
              target: '24'
            },
            {
              id: '218',
              source: '70',
              target: '25'
            },
            {
              id: '223',
              source: '70',
              target: '27'
            },
            {
              id: '224',
              source: '70',
              target: '41'
            },
            {
              id: '225',
              source: '70',
              target: '58'
            },
            {
              id: '220',
              source: '70',
              target: '68'
            },
            {
              id: '219',
              source: '70',
              target: '69'
            },
            {
              id: '230',
              source: '71',
              target: '11'
            },
            {
              id: '233',
              source: '71',
              target: '25'
            },
            {
              id: '226',
              source: '71',
              target: '27'
            },
            {
              id: '232',
              source: '71',
              target: '41'
            },
            {
              id: null,
              source: '71',
              target: '48'
            },
            {
              id: '228',
              source: '71',
              target: '68'
            },
            {
              id: '227',
              source: '71',
              target: '69'
            },
            {
              id: '229',
              source: '71',
              target: '70'
            },
            {
              id: '236',
              source: '72',
              target: '11'
            },
            {
              id: '234',
              source: '72',
              target: '26'
            },
            {
              id: '235',
              source: '72',
              target: '27'
            },
            {
              id: '237',
              source: '73',
              target: '48'
            },
            {
              id: '238',
              source: '74',
              target: '48'
            },
            {
              id: '239',
              source: '74',
              target: '73'
            },
            {
              id: '242',
              source: '75',
              target: '25'
            },
            {
              id: '244',
              source: '75',
              target: '41'
            },
            {
              id: null,
              source: '75',
              target: '48'
            },
            {
              id: '241',
              source: '75',
              target: '68'
            },
            {
              id: '240',
              source: '75',
              target: '69'
            },
            {
              id: '245',
              source: '75',
              target: '70'
            },
            {
              id: '246',
              source: '75',
              target: '71'
            },
            {
              id: '252',
              source: '76',
              target: '48'
            },
            {
              id: '253',
              source: '76',
              target: '58'
            },
            {
              id: '251',
              source: '76',
              target: '62'
            },
            {
              id: '250',
              source: '76',
              target: '63'
            },
            {
              id: '247',
              source: '76',
              target: '64'
            },
            {
              id: '248',
              source: '76',
              target: '65'
            },
            {
              id: '249',
              source: '76',
              target: '66'
            }
          ],
          categories: [
            {
              name: '类目0'
            },
            {
              name: '类目1'
            },
            {
              name: '类目2'
            },
            {
              name: '类目3'
            },
            {
              name: '类目4'
            },
            {
              name: '类目5'
            },
            {
              name: '类目6'
            },
            {
              name: '类目7'
            },
            {
              name: '类目8'
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
</script>

<style scoped>

</style>