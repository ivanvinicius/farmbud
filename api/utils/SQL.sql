
CREATE TABLE measures (
  id uuid NOT NULL,
  name VARCHAR NOT NULL,
  CONSTRAINT pk_measures PRIMARY KEY (id)
);

CREATE TABLE cultures (
  id uuid NOT NULL,
  name VARCHAR NOT NULL,
  CONSTRAINT pk_cultures PRIMARY KEY (id)
);

CREATE TABLE brands (
  id uuid NOT NULL,
  name VARCHAR NOT NULL,
  CONSTRAINT pk_brands PRIMARY KEY (id)
);

CREATE TABLE categories (
  id uuid NOT NULL,
  parent_id uuid,
  name VARCHAR NOT NULL,
  CONSTRAINT pk_categories PRIMARY KEY (id)
);

CREATE TABLE products (
  id uuid NOT NULL,
  category_id uuid NOT NULL,
  brand_id uuid NOT NULL,
  name VARCHAR NOT NULL,
  composition VARCHAR,
  CONSTRAINT pk_products PRIMARY KEY (id)
);

CREATE TABLE addresses (
  id uuid NOT NULL,
  parent_id uuid,
  name VARCHAR NOT NULL,
  CONSTRAINT pk_addresses PRIMARY KEY (id)
);

CREATE TABLE users (
  id uuid NOT NULL,
  address_id uuid,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  provider BOOLEAN NOT NULL,
  CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE portfolios (
  id uuid NOT NULL,
  parent_id uuid,
  provider_id uuid NOT NULL,
  product_id uuid,
  culture_id uuid,
  measure_id uuid,
  size NUMERIC(10,2),
  price NUMERIC(10,2),
  recommendation NUMERIC(10,2),
  productivity NUMERIC,
  CONSTRAINT pk_portfolios PRIMARY KEY (id)
);

CREATE TABLE seasons (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR,
  start_at DATE NOT NULL,
  end_at DATE NOT NULL,
  CONSTRAINT pk_seasons PRIMARY KEY (id)
);

CREATE TABLE areas (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR,
  size NUMERIC(10,2) NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  CONSTRAINT pk_areas PRIMARY KEY (id)
);

CREATE TABLE budgets (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  provider_id uuid NOT NULL,
  portfolio_id uuid NOT NULL,
  area_id uuid NOT NULL,
  season_id uuid NOT NULL,
  amount_usage NUMERIC(10,2) NOT NULL,
  amount_cost NUMERIC(10,2) NOT NULL,
  amount_quantity NUMERIC(10,2) NOT NULL,
  CONSTRAINT pk_budgets PRIMARY KEY (id)
);

-- Contraints

ALTER TABLE portfolios ADD CONSTRAINT measure_portfolio_fk
FOREIGN KEY (measure_id)
REFERENCES measures (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE portfolios ADD CONSTRAINT cultures_portfolio_fk
FOREIGN KEY (culture_id)
REFERENCES cultures (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE products ADD CONSTRAINT brands_products_fk
FOREIGN KEY (brand_id)
REFERENCES brands (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE categories ADD CONSTRAINT categories_categories_fk
FOREIGN KEY (parent_id)
REFERENCES categories (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE products ADD CONSTRAINT categories_products_fk
FOREIGN KEY (category_id)
REFERENCES categories (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE portfolios ADD CONSTRAINT products_portfolio_fk
FOREIGN KEY (product_id)
REFERENCES products (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE addresses ADD CONSTRAINT addresses_addresses_fk
FOREIGN KEY (parent_id)
REFERENCES addresses (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE users ADD CONSTRAINT addresses_users_fk
FOREIGN KEY (address_id)
REFERENCES addresses (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE areas ADD CONSTRAINT users_areas_fk
FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE seasons ADD CONSTRAINT users_seasons_fk
FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE portfolios ADD CONSTRAINT users_portfolio_fk
FOREIGN KEY (provider_id)
REFERENCES users (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE budgets ADD CONSTRAINT providers_budgets_fk
FOREIGN KEY (provider_id)
REFERENCES users (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE budgets ADD CONSTRAINT users_budgets_fk
FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE portfolios ADD CONSTRAINT portfolio_portfolio_fk
FOREIGN KEY (parent_id)
REFERENCES portfolios (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE budgets ADD CONSTRAINT portfolios_budgets_fk
FOREIGN KEY (portfolio_id)
REFERENCES portfolios (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE budgets ADD CONSTRAINT seasons_budgets_fk
FOREIGN KEY (season_id)
REFERENCES seasons (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE budgets ADD CONSTRAINT areas_budgets_fk
FOREIGN KEY (area_id)
REFERENCES areas (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;


--ADDRESSES
--States
INSERT INTO addresses (id, parent_id, name) VALUES ('f7cecb73-1d75-4d83-85ac-3df7e6c7e020', null, 'SC');
INSERT INTO addresses (id, parent_id, name) VALUES ('c082b72b-eb3c-4ba9-9009-a55775ac0f7f', null, 'PR');
INSERT INTO addresses (id, parent_id, name) VALUES ('3edf5e49-e7d4-48e5-a22c-65325c6e2982', null, 'RS');
--Cities
INSERT INTO addresses (id, parent_id, name) VALUES ('59e5df83-edde-4864-83f2-d72be183ab04', 'f7cecb73-1d75-4d83-85ac-3df7e6c7e020', 'Taió');
INSERT INTO addresses (id, parent_id, name) VALUES ('918111c8-2b03-4e00-a28e-c5506c4a438e', 'f7cecb73-1d75-4d83-85ac-3df7e6c7e020', 'Rio do Sul');
INSERT INTO addresses (id, parent_id, name) VALUES ('0a6a01b1-78fd-491d-8876-08152cb4e235', 'f7cecb73-1d75-4d83-85ac-3df7e6c7e020', 'Lages');
INSERT INTO addresses (id, parent_id, name) VALUES ('102edd60-8d2e-4808-9afb-18b81b2c96ac', 'f7cecb73-1d75-4d83-85ac-3df7e6c7e020', 'Campos Novos');
INSERT INTO addresses (id, parent_id, name) VALUES ('9061ab60-29ad-4ec3-bdb2-a2eafcf096f7', 'f7cecb73-1d75-4d83-85ac-3df7e6c7e020', 'Blumenau');
INSERT INTO addresses (id, parent_id, name) VALUES ('97b9aed8-a2a2-42b8-adbe-3efa19bbffa3', 'c082b72b-eb3c-4ba9-9009-a55775ac0f7f', 'Curitiba');
INSERT INTO addresses (id, parent_id, name) VALUES ('03224645-c2c8-4ac8-a433-54c5ce67fe79', 'c082b72b-eb3c-4ba9-9009-a55775ac0f7f', 'Cascavel');
INSERT INTO addresses (id, parent_id, name) VALUES ('116ca5d0-2b1a-478e-886c-148c522c8429', 'c082b72b-eb3c-4ba9-9009-a55775ac0f7f', 'Londrina');
INSERT INTO addresses (id, parent_id, name) VALUES ('b4decae9-a4d2-4980-9d39-8905080e6277', 'c082b72b-eb3c-4ba9-9009-a55775ac0f7f', 'Maringá');
INSERT INTO addresses (id, parent_id, name) VALUES ('d48b8324-a070-4bb3-892c-5333d25ff849', 'c082b72b-eb3c-4ba9-9009-a55775ac0f7f', 'Fox do Iguaçu');
INSERT INTO addresses (id, parent_id, name) VALUES ('583f8048-d966-4746-9e41-195f6e73128e', '3edf5e49-e7d4-48e5-a22c-65325c6e2982', 'Porto Alegre');
INSERT INTO addresses (id, parent_id, name) VALUES ('2c91b324-c867-4b3a-83a9-d23f7e59a807', '3edf5e49-e7d4-48e5-a22c-65325c6e2982', 'Esteio');
INSERT INTO addresses (id, parent_id, name) VALUES ('9692a7e2-52ed-48d3-9463-906e72233488', '3edf5e49-e7d4-48e5-a22c-65325c6e2982', 'Pelotas');
INSERT INTO addresses (id, parent_id, name) VALUES ('be4250ad-d562-40cf-818a-1ae27755c1fa', '3edf5e49-e7d4-48e5-a22c-65325c6e2982', 'Canoas');
INSERT INTO addresses (id, parent_id, name) VALUES ('0d652a72-ac91-46ad-9201-64acd88a2264', '3edf5e49-e7d4-48e5-a22c-65325c6e2982', 'Novo Hamburgo');

--BRANDS
INSERT INTO brands (id, name) VALUES ('8afa8641-fc80-47c5-ad39-5191ab2b1574', 'Timac ');
INSERT INTO brands (id, name) VALUES ('598ed064-e150-47f5-aa34-7b90aba8ba99', 'Yara');
INSERT INTO brands (id, name) VALUES ('922fe2cc-bf82-4818-a400-46290494de94', 'FecoAgro');
INSERT INTO brands (id, name) VALUES ('878831a9-4065-4b04-8e0e-1ead9da101b0', 'Bayer');
INSERT INTO brands (id, name) VALUES ('1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Syngenta');

--CULTURES
INSERT INTO cultures (id, name) VALUES ('4e08a52b-d4a0-4fa3-82c1-b82f5925eb0b', 'Soja');
INSERT INTO cultures (id, name) VALUES ('757b8538-9624-4997-9c84-9f7b6ae41ac8', 'Arroz');
INSERT INTO cultures (id, name) VALUES ('e49ed1f2-dccb-4ad8-93ef-fd10bd1fca82', 'Milho');
INSERT INTO cultures (id, name) VALUES ('49aa1752-4d02-4277-b842-4a9c6c8d8ec0', 'Trigo ');
INSERT INTO cultures (id, name) VALUES ('6952c68b-3009-4bb6-b08a-936db5bc01ca', 'Tabaco');

--MEASURES
INSERT INTO measures (id, name) VALUES ('e7499e52-3ff6-4400-9c90-1e8e4a8c9a10', 'KG');
INSERT INTO measures (id, name) VALUES ('139bd4be-d354-4b68-919c-b537932ec425', 'LT');

--CATEGORIES
INSERT INTO categories (id, parent_id, name) VALUES ('1211f137-1ee1-4855-af6c-fec8d034501a', null, 'Agroquímico');
INSERT INTO categories (id, parent_id, name) VALUES ('410ba595-a1b2-4bb4-a63d-bc809da3b453', null, 'Fertilizante');
--Subcategories
INSERT INTO categories (id, parent_id, name) VALUES ('bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1211f137-1ee1-4855-af6c-fec8d034501a', 'Herbicida');
INSERT INTO categories (id, parent_id, name) VALUES ('2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1211f137-1ee1-4855-af6c-fec8d034501a', 'Inseticida');
INSERT INTO categories (id, parent_id, name) VALUES ('25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1211f137-1ee1-4855-af6c-fec8d034501a', 'Fungicida');
INSERT INTO categories (id, parent_id, name) VALUES ('a4e8bef9-600e-4675-be50-7b6113a274fe', '1211f137-1ee1-4855-af6c-fec8d034501a', 'Acaricida');
INSERT INTO categories (id, parent_id, name) VALUES ('ef7fb011-9ad8-4dad-8136-bef19bd5f87e', '1211f137-1ee1-4855-af6c-fec8d034501a', 'Adjuvante');
INSERT INTO categories (id, parent_id, name) VALUES ('53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '410ba595-a1b2-4bb4-a63d-bc809da3b453', 'Químico');
INSERT INTO categories (id, parent_id, name) VALUES ('9836427c-8ee9-4dea-a258-97fe9a05701e', '410ba595-a1b2-4bb4-a63d-bc809da3b453', 'Orgânico');

--PRODUCTS
--Fertilizantes Timac
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('d8ef691e-e59f-4927-a837-8e7e18a46568', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'INRIZZA', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('85a41088-7faa-40ab-9af1-5d833425f056', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'NP Plus', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6bee75ef-ca3b-4022-a2b0-3bb302fc3621', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'K-UP', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('da61ee56-9248-460a-b80f-26586ec75825', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'TOP-PHOS', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6b8f2662-c23c-492e-bcfc-31a0186bb4aa', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'PhysAlg', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('83a908c7-66a7-4aef-b7b2-9f13c156799d', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'Sulfammo MeTA', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('a46e0064-2925-44c3-83bf-1beacf67a235', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'Basiduo', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('b202e866-945f-4885-bcb8-0190e62b442d', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'PROGEN', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('5dd3ee23-c023-4c1f-be38-03791812f884', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'FERTIACTYL', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('51d5f340-11ab-4afe-8379-0dd315f23094', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'FERTILEADER', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('3f59f3f9-f442-40a0-9500-0898a7e9d17e', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'eNergis', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('c1389096-261c-48dc-b021-e1c400419160', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'EUROFIT', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('afaf4d52-6373-45b8-9851-d6cd842bb4a3', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'KSC', 'N10P16K20');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('1bc45226-f27e-494e-ad13-3fb219dcde57', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '8afa8641-fc80-47c5-ad39-5191ab2b1574', 'CORONA', 'N10P16K20');
--Fertilizantes Yara
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('fc41b6ed-93fe-43ec-be03-88af21679ce9', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Basa Soberano', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6d46cef4-58e1-4e40-a452-381acdaec1fc', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Basa Seleto', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('8cbfacc8-b14c-4b85-948e-4261f06b4d07', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Basa Absoluto', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('edca284d-1c9d-45c0-a86e-1efd5e16f58e', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Mila PALMAE', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('989f57ac-4b15-475c-b2f5-972e52658b25', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Mila 21-07-14', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('d961d7f5-02f4-4217-a864-ed57f7add539', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Mila CAFÉ', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('b89e9634-9e5b-49f2-abb6-4103268b7f1a', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Mila 16-16-16', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('d02baae4-83ec-42df-9821-16ea48990364', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Bela 27-00-00 + Mg', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('885cc003-3b90-44da-bc9c-46520aea4018', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Bela pluS', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('0cc764eb-82d8-4967-9322-1f386a17c52d', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Vita FOLICARE PHOS', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('5a532a63-b9bf-4279-adb7-81b6d99b98c1', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Vita FOLICARE', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('e32160a8-689d-4a68-86b4-927f04c00982', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Tera CALCINIT', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('dc1b3c8a-5a2c-4cdc-a991-2c2dbfde08ff', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Tera KRISTALON', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('c29deb27-e5d8-414f-a0ab-40f8db90bce9', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Liva NKÁLCIO 13-18-00', 'N18P10K8');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('1d13ffab-b141-411e-91d5-676366c37876', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '598ed064-e150-47f5-aa34-7b90aba8ba99', 'Vera (40-00-00)', 'N18P10K8');
--Fertilizantes Fecoagro
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('661c6a84-9a4b-401f-b4e7-0913e200767d', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '922fe2cc-bf82-4818-a400-46290494de94', 'Cooper N+', 'N16P16K18');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('507fdbe8-a110-4aca-b585-f22036d5c8f8', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '922fe2cc-bf82-4818-a400-46290494de94', 'Nobre Premium', 'N16P16K18');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('c1888033-0e96-49e5-86c3-d8b33c4ad1cd', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '922fe2cc-bf82-4818-a400-46290494de94', 'Nobre', 'N16P16K18');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('f7464d2b-2f1e-42fe-9fbc-c0e5e05cbd2a', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '922fe2cc-bf82-4818-a400-46290494de94', 'Nobre Max', 'N16P16K18');
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('28826055-3350-4726-a7ca-b5f82dc99d24', '53b5aa7f-f7ec-4d17-886a-50e89a0446e2', '922fe2cc-bf82-4818-a400-46290494de94', 'Fecoagro', 'N16P16K18');
--Agrotóxicos Bayer
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('a36a98d4-2423-49db-a3d2-0ce07f6f22a6', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Alion', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('cfd99d67-e6e4-48ac-9631-744480b6bde7', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Gladium', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('2a0f5a38-7668-4fc1-bfad-de38cfc98d43', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Soberan', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('47c6c123-7ba2-41c7-8881-0f94ded0f9c0', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Connect', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('1d1e29bf-db50-4370-a666-375678b8e438', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Oberon', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('f2ac5317-ef83-4554-bacc-9bb6252c116a', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Primier Plus', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('b3d219f4-49de-45c9-a6ea-9dec5f8013ed', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Calypso', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('4828b9c4-19c4-487f-be1e-63c4fc9be2a9', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Confidor', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('d2755281-6a68-4669-94f7-6a2adb8baf68', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Bulldock', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('363b8a60-565e-4848-a5e8-f5141b85a451', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Verango Prime', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('e74c6956-afc0-4381-b42c-4d60fc41edc8', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Larvin', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('637012b6-61f0-48fb-8d81-9e8db6d2a5ce', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Hussar', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6512582a-265f-4fe9-ad56-53fdea4549e0', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Evidence', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('9b4611e9-9e57-4583-a428-d7ce31a8b241', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Primier', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('a1c188e5-ceab-4580-b83d-e30b2a1c5437', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Mythos', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('da6b0e66-76df-4556-ac7d-1d516b4ef067', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Nativo', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('58763266-efaf-4f3d-b74b-b35b174d4934', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Fox', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('97de521f-31e4-4c40-8ad0-3dfd2b72ac9c', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Aliette', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('1e6a075d-9d5c-4a16-8adb-9db288b5ad7c', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Antracol', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('7cecb437-83c3-4522-bfe1-1621e0136708', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Consento', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('777e7adf-efed-4ec9-84b1-eb0370be12d4', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Infinito', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('c3a23c1a-c106-4487-a018-3c064917b9a3', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Fox Xpro', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('905ac9f3-abaa-4f87-a512-eb8d73bbae96', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Shapere Max', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('b497e4ef-b5bb-411f-b45f-91f2f30dcd91', 'a4e8bef9-600e-4675-be50-7b6113a274fe', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Envidor', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('31c9e994-477b-4db4-ac12-a58eec01fe69', 'ef7fb011-9ad8-4dad-8136-bef19bd5f87e', '878831a9-4065-4b04-8e0e-1ead9da101b0', 'Aureo', null);
--Agrotóxicos Syngenta
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6ac2bb5c-45e6-44eb-b7e3-a70d7cee419e', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Dual Gold', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('47dea183-c9a7-41dc-8019-9b75f5d78ff8', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Calaris', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('bc6c2f46-d1b5-44ac-8d84-32437c63627a', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Calipen SC', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('8cf32579-4553-4098-a021-02209afca587', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Grove', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('dea666ea-d392-4fee-b57c-e4d2ad67afc8', 'bd71ea96-0292-4a0e-b85b-b18adf6960c1', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Reglone', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('50c2370a-90f4-4a06-a408-a14cde501891', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Engeo Pleno S', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('5fd9e54c-b8bd-4dc7-84c6-24e669bc9627', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Ampligo', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('4db56365-d1bb-48b1-b6a6-94f3d709703f', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Voliam Targo', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('080aaee0-e7fd-4040-b34d-aae613296ddc', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Durivo', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('f31823e5-3f68-4559-bfd7-8ee1cbc48d55', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Minecto Pro', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('4b555fd6-86f5-4246-a6ef-98fd07d68be8', '2acb34e8-81da-4eba-a42b-0b31fa726f6a', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Actara', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('292f8f1f-0145-46d5-8f05-73e2db38a926', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Alade', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('5e17fdcf-6f1b-4aa8-8a00-d645d19f97f6', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Cypres', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('38354829-f5ff-4f88-b6fc-745a3b841af4', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Revus', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('70ac5102-b08a-4a95-bb27-46485cfaa771', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Elatus', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('bf45a270-5a13-4333-8eaf-4c28b60bd2be', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Amistar', null);
INSERT INTO products (id, category_id, brand_id, name, composition) VALUES ('6c19c8d1-a11a-454a-b308-60e5b63d206f', '25ccc0c5-0ab9-411b-9429-d73a7ada6be9', '1654fc0c-50b3-44bb-9ea9-845da35ae50a', 'Bravonil', null);
