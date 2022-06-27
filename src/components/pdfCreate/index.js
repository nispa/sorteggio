import React from 'react'
import { Page as PdfPage, Text, View, Document as PdfDocument, PDFViewer, StyleSheet as PdfStyleSheet, Image, Font} from '@react-pdf/renderer';
import moment from 'moment'
import StoreContext from '../../store'


// Fonts importati
import OpenSans from "../../assets/OpenSans-Regular.ttf"
import OpenSansBold from "../../assets/OpenSans-Bold.ttf"

Font.register({
    family: 'OpenSans',
        format: "truetype",
        src: OpenSans
  });

Font.register( {
  family: "OpenSansBold",
  format: "truetype",
  src: OpenSansBold
})



const styles = PdfStyleSheet.create({
    page: {
        paddingTop: "20pt",
        paddingBottom: "30pt",
        paddingHorizontal: "20pt",
        backgroundColor: '#fff',
        fontFamily: 'OpenSans'
    },
    section: {
      fontSize: 12,
      paddingTop: "5pt", 
      paddingLeft: "20pt",
      paddingBottom: "20pt"
    },
    image: {
        width: "50pt", 
        height: "54pt",
        left: 252,
        paddingBottom: 6,
        textAlign: "center"
    },
    title: {
        textAlign: 'center',
        margin: 0,
        fontSize: 20,
        paddingBottom: "20pt"
    },
  });


export default function PdfCreate ({data}){
  const elenco = data.elenco
  const vincitori = data.data
  const {config} = React.useContext(StoreContext) 
  const { institutionLogo, institutionName, titleSorteggio, pdfVisibilityFields, pdfSquared} = config

  return <PDFViewer width={600} height={800}>
          <PdfDocument>
              <PdfPage size={'A4'} wrap={true} orientation={'portrait'} style={styles.page}>
                  <View fixed style={styles.title} >
                    <Text style={{fontSize: 8, textAlign: "right"}} render={({ pageNumber, totalPages }) => (
                      `${pageNumber} / ${totalPages}`
                    )} fixed />
                        <View style={{textAlign: 'center'}}>
                              <Image src={institutionLogo} style={styles.image} />
                        <Text style={{fontSize: 16, fontFamily: "OpenSansBold"}}>{institutionName}</Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 14}}>
                            {titleSorteggio}
                        </Text>
                        <Text style={{fontSize: 16}}>
                            Estrazione del {moment().format('DD/MM/YYYY - HH:mm:ss')}
                        </Text>
                        </View>
                  </View>
                  <View style={{paddingBottom: "10pt", textAlign: "center"}}>
                        <View style={styles.section}  >
                          {Object.keys(elenco).map( item => {
                              return <View key={item}>
                                <Text style={{fontFamily: "OpenSansBold", padding: "4pt", fontSize: 13}}>{item}</Text>
                                  {elenco[item].map(
                                    (win) => <Text style={{fontSize: 11}} key={win[pdfSquared] + Math.random(1)}>
                                         {pdfVisibilityFields.map( el => win[el.value] + " ")} 
                                         {pdfSquared.length ? `[${win[pdfSquared]}]`: ""}
                                      </Text>
                                    )}
                                </View>
                          })}
                        </View>
                  </View>
                  <View break>
                    <Text style={{fontSize: 22, fontFamily: "OpenSansBold", textAlign: 'center'}}>Graduatoria sorteggio </Text>
                    <Text style={{fontSize: 12, fontFamily: "OpenSans", textAlign: 'center'}}>{titleSorteggio}</Text>
                  </View>
                  <View style={{margin: 30, paddingBottom: 10}}>
                        <View style={styles.section} >
                          {vincitori.map( (item, idx) => {
                            const styleSingle = {paddingBottom: "5pt"}
                            if(item.selectedGroup !== ""){
                              styleSingle.fontFamily = 'OpenSansBold'
                            }
                          return <View key={idx} style={styleSingle} >
                                <Text style={{fontSize: 13}}>{idx+1} - {pdfVisibilityFields.map( element => item[element.value] + " ")} 
                                         {pdfSquared.length ? `[${item[pdfSquared]}]`: ""}</Text>
                              </View>
                            }
                          )}
                        </View>
                  </View>
            </PdfPage>
          </PdfDocument>
        </PDFViewer>
}
