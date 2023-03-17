class Order {
  constructor(
    id,
    customerid,
    order_id,
    customer_email,
    order_number,
    total_price,
    subtotal_price,
    merchant,
    product_id,
    payment_method,
    financial_status,
    fulillment_status,
    shipment_status,
    note,
    kptn,
    cancelled_at,
    cancel_reason,
    shipping_address,
    shipping_province,
    shipping_zip,
    shipping_fee,
    customer_address,
    phone,
    city,
    tags,
    quantity,
    delivery_date,
    closed_at,
    discount,
    tax,
    updated_at,
    created_at,
    expired,
    total_gross_price,
    courier
  ) {
    this.id = id;
    this.customerid = customerid;
    this.order_id = order_id;
    this.customer_email = customer_email;
    this.order_number = order_number;
    this.total_price = total_price;
    this.subtotal_price = subtotal_price;
    this.merchant = merchant;
    this.product_id = product_id;
    this.payment_method = payment_method;
    this.financial_status = financial_status;
    this.fulillment_status = fulillment_status;
    this.shipment_status = shipment_status;
    this.note = note;
    this.kptn = kptn;
    this.cancelled_at = cancelled_at;
    this.cancel_reason = cancel_reason;
    this.shipping_address = shipping_address;
    this.shipping_province = shipping_province;
    this.shipping_zip = shipping_zip;
    this.shipping_fee = shipping_fee;
    this.customer_address = customer_address;
    this.phone = phone;
    this.city = city;
    this.tags = tags;
    this.quantity = quantity;
    this.delivery_date = delivery_date;
    this.closed_at = closed_at;
    this.discount = discount;
    this.tax = tax;
    this.updated_at = updated_at;
    this.created_at = created_at;
    this.expired = expired;
    this.total_gross_price = total_gross_price;
    this.courier = courier;
  }
}

module.exports = Order;
