from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    capacidade = db.Column(db.Integer, nullable=False)
    data_de_lancamento = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    def __init__(self, marca, modelo, capacidade, data_de_lancamento):
        self.marca = marca
        self.modelo = modelo
        self.capacidade = capacidade
        self.data_de_lancamento = data_de_lancamento
        db.create_all()
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'marca', 'modelo', 'capacidade', 'data_de_lancamento')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

@app.route('/products', methods=['POST'])
def add_product():
    marca = request.json['marca']
    modelo = request.json['modelo']
    capacidade = request.json['capacidade']
    data_de_lancamento = datetime.strptime(request.json['data_de_lancamento'], '%Y-%m-%d').date()

    new_product = Product(marca, modelo, capacidade, data_de_lancamento)
    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

@app.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)

@app.route('/products/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    marca = request.json['marca']
    modelo = request.json['modelo']
    capacidade = request.json['capacidade']
    data_de_lancamento = datetime.strptime(request.json['data_de_lancamento'], '%Y-%m-%d').date()

    product.marca = marca
    product.modelo = modelo
    product.capacidade = capacidade
    product.data_de_lancamento = data_de_lancamento

    db.session.commit()

    return product_schema.jsonify(product)

@app.route('/products/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

    return product_schema.jsonify(product)

if __name__ == '__main__':
    app.run(debug=True)
