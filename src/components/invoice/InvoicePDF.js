/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoicePDF({ invoice,order,seller }) {
  

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/assets/logos/2.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{order.invoicestatus}</Text>
            <Text> {`INV-${order._id}`} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
            <Text style={styles.body1}>{seller.fullname}</Text>
            <Text style={styles.body1}>{seller.businessaddress}</Text>
            <Text style={styles.body1}>{seller.contact}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
            <Text style={styles.body1}>{order.firstname} {order.lastname}</Text>
            <Text style={styles.body1}>{order.businessaddress}</Text>
            <Text style={styles.body1}>{order.contact}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Bank Details</Text>
            <Text style={styles.body1}>Title: Fabrico</Text>
            <Text style={styles.body1}>Account Number: 3264586256</Text>
            <Text style={styles.body1}>IBAN: PK763497593447597349</Text>
          </View>

          
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Date create</Text>
            <Text style={styles.body1}>{fDate(order.createdAt)}</Text>
          </View>
          
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Price</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            
              <View style={styles.tableRow} >
                <View style={styles.tableCell_1}>
                  <Text>1</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{order.product.productname}</Text>
                  <Text>{order.product.fabrictype}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{order.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{order.product.price} Rs</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{order.subTotal} Rs</Text>
                </View>
              </View>
            

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{order.subTotal} Rs</Text>
              </View>
            </View>

            

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Shipping</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{order.shipping} Rs</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{order.total} Rs</Text>
              </View>
            </View>

          </View>
        </View>
            <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              We appreciate your business. Feel free to contact us for any help!
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@fabrico.com</Text>
          </View>
        </View>

        
      </Page>
    </Document>
  );
}
