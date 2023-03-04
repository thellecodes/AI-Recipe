import os
import openai
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.http import JsonResponse

print(os.getenv('SENDGRID_API_KEY'))

# Set the SendGrid API key
sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))

# Set the OpenAi API Keys
openai.organization = os.getenv("YOUR_ORG_ID")
openai.api_key = os.getenv("OPENAI_API_KEY")


@api_view(['GET'])
def index(request):
    return render(request, 'index.html')


@api_view(['POST'])
def gen(request):
    return Response(request.data)


@api_view(['POST'])
def sendEmail(request):
    first_name = request.data['firstname']
    last_name = request.data['lastname']
    result = request.data['result']

    # Define the email message
    message = Mail(
        from_email='hello@myai.life',
        to_emails=request.data['email'],
        subject=f'{first_name} {last_name} Here is your Cousine',
        html_content=result)

    try:
        response = sg.send(message)
        return JsonResponse({'sent': True})
    except Exception as e:
        return JsonResponse({'sent': False, 'error': str(e)})
