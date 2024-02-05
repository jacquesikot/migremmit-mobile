CREATE TABLE customer_refunds (
    refund_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    order_number VARCHAR(20) NOT NULL,
    refund_amount DECIMAL(10, 2) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    refund_status VARCHAR(20) DEFAULT ‘Pending’,
    approver_name VARCHAR(255)
);
-- Inserting 10 Pending Refunds with Email Approvers
INSERT INTO customer_refunds (customer_name, order_number, refund_amount, approver_name) VALUES
    (‘John Doe’, ‘ORD123’, 50.00, ‘john.doe@test.com’),
    (‘Jane Smith’, ‘ORD456’, 75.50, ‘jane.smith@test.com’),
    (‘Alice Johnson’, ‘ORD789’, 30.25, ‘alice.johnson@test.com’),
    (‘Bob Anderson’, ‘ORD101’, 45.75, ‘bob.anderson@test.com’),
    (‘Eva Williams’, ‘ORD202’, 60.00, ‘eva.williams@test.com’),
    (‘Charlie Brown’, ‘ORD303’, 25.50, ‘charlie.brown@test.com’),
    (‘David Miller’, ‘ORD404’, 90.25, ‘david.miller@test.com’),
    (‘Grace Davis’, ‘ORD505’, 55.75, ‘grace.davis@test.com’),
    (‘Frank White’, ‘ORD606’, 70.00, ‘frank.white@test.com’),
    (‘Sarah Jones’, ‘ORD707’, 15.25, ‘sarah.jones@test.com’);
-- Inserting 5 Approved Refunds
INSERT INTO customer_refunds (customer_name, order_number, refund_amount, refund_status, approver_name) VALUES
    (‘Mark Johnson’, ‘ORD808’, 40.00, ‘Approved’, ‘mark.johnson@test.com’),
    (‘Linda Carter’, ‘ORD909’, 65.50, ‘Approved’, ‘linda.carter@test.com’),
    (‘Tom Wilson’, ‘ORD010’, 80.25, ‘Approved’, ‘tom.wilson@test.com’),
    (‘Sara Evans’, ‘ORD111’, 35.75, ‘Approved’, ‘sara.evans@test.com’),
    (‘Ryan Parker’, ‘ORD212’, 50.00, ‘Approved’, ‘ryan.parker@test.com’);
-- Inserting 5 Rejected Refunds
INSERT INTO customer_refunds (customer_name, order_number, refund_amount, refund_status, approver_name) VALUES
    (‘Emily Taylor’, ‘ORD313’, 25.00, ‘Rejected’, ‘emily.taylor@test.com’),
    (‘Michael Clark’, ‘ORD414’, 45.50, ‘Rejected’, ‘michael.clark@test.com’),
    (‘Olivia Brown’, ‘ORD515’, 70.75, ‘Rejected’, ‘olivia.brown@test.com’),
    (‘William Davis’, ‘ORD616’, 15.25, ‘Rejected’, ‘william.davis@test.com’),
    (‘Ava Robinson’, ‘ORD717’, 90.00, ‘Rejected’, ‘ava.robinson@test.com’);