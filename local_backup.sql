--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: user_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_gender_enum AS ENUM (
    'm',
    'f',
    'u'
);


ALTER TYPE public.user_gender_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: deal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deal (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    yield_amount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    total_dhs character varying NOT NULL,
    sold character varying NOT NULL,
    ticket_dhs character varying NOT NULL,
    days_left character varying NOT NULL,
    deal_img_path character varying(300)
);


ALTER TABLE public.deal OWNER TO postgres;

--
-- Name: deal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.deal_id_seq OWNER TO postgres;

--
-- Name: deal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deal_id_seq OWNED BY public.deal.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    username character varying(15) NOT NULL,
    email character varying(40) NOT NULL,
    password character varying NOT NULL,
    gender public.user_gender_enum NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: deal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deal ALTER COLUMN id SET DEFAULT nextval('public.deal_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: deal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deal (id, name, yield_amount, total_dhs, sold, ticket_dhs, days_left, deal_img_path) FROM stdin;
12	The Marina Torch	9.25	6500000	75	60000	150	/uploads/The_Marina_Torch.jpg
13	HHHR Tower	9.25	6500000	75	60000	150	/uploads/HHHR_Tower.jpg
14	Ocean peaks	9.25	6500000	75	60000	150	/uploads/Ocean_peaks.jpg
15	Al Yaqoub Tower	9.25	6500000	75	60000	150	/uploads/Al_Yaqoub_Tower.jpg
16	Mercedes Benz Places	9.25	6500000	75	60000	150	/uploads/Mercedes_Benz_Places.jpg
18	The Tower Plaza Hotel	9.25	6500000	75	60000	150	/uploads/The_Tower_Plaza_Hotel.jpg
19	Burj_Khalifa	9.25	6500000	75	60000	150	/uploads/Burj_Khalifa.jpg
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, username, email, password, gender) FROM stdin;
2	alice sno	alice	alicesno@gmail.com	AliceSno$19	f
3	jack sparrow	jack	jackspaarow@gmail.com	Jack!33Spa	m
4	Jessica Spark	jess	jes@mail.com	13133asd	f
5	asdasdasd	username	13132@mail.com	asdada	m
6	Developer 1	dev1	dev1@mail.com	13133asd	u
\.


--
-- Name: deal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deal_id_seq', 19, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- Name: deal PK_9ce1c24acace60f6d7dc7a7189e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deal
    ADD CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

