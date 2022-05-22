from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.combining import OrTrigger
from apscheduler.triggers.cron import CronTrigger
import sys
from . import getdailyword

sys.path.append("wordle\daily_word_updater")


def start():
    scheduler = BackgroundScheduler(timezone='America/New_York')
    trigger = OrTrigger([CronTrigger(hour=23, minute=58)])
    scheduler.add_job(getdailyword.update_daily_word, trigger)
    scheduler.start()
