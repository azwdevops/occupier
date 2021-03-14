# Generated by Django 3.1.7 on 2021-03-14 17:56

import django.contrib.postgres.fields.citext
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='account_type',
            field=django.contrib.postgres.fields.citext.CICharField(choices=[('agent', 'agent'), ('tenant', 'tenant'), ('transporter', 'transporter')], max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=django.contrib.postgres.fields.citext.CICharField(choices=[('Nairobi', 'Nairobi'), ('Thika', 'Thika'), ('Nakuru', 'Nairobi')], max_length=255),
        ),
    ]