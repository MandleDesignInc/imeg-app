<?php
/**
 * Created by Ryan Potsander
 * Date: 10/11/17
 */

class MyControllerLeaders extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';


    public function read($id) {

        if (empty($id)) {
            return $this->failure($this->modx->lexicon('rest.err_field_ns',array(
                'field' => $this->primaryKeyField,
            )));
        }
        /** @var xPDOObject $object */
        $c = $this->getPrimaryKeyCriteria($id);
        $this->object = $this->modx->getObject($this->classKey,$c);
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }

        $objectArray = array();
        $objectArray['page'] =  $this->getCurrentPage($id);
        $objectArray['groups'] = $this->getLeaders($id);

        return $this->success('',$objectArray);
    }

    public function getCurrentPage($id) {

        $page = array();

        $page['id'] = $id;
        $page['title'] = $this->object->pagetitle;
        $page['alias'] = $this->object->alias;
        $page['content'] = $this->object->content;

        return $page;
    }

    public function getLeaders($id) {

        $leaders = array();

        $groupIds = $this->modx->getChildIds($id, 1, array('context' => 'web'));

        foreach ($groupIds as $groupId) {

            $group = array();
            $group['title'] = $this->getTemplateVariable($groupId, 68);
            $group['leaders'] = array();

            $leaderIds = $this->modx->getChildIds($groupId, 1, array('context' => 'web'));

            foreach ($leaderIds as $leaderId) {
                array_push($group['leaders'], $this->getLeader($leaderId));
            }

            array_push($leaders, $group);

        }

        return $leaders;
    }

    public function getLeader($id) {

        $uploadsPath = 'http://bluemandle2.com/~imeg/cms/assets/uploads/';

        $leader = array();

        // info
        $leader['firstName'] = $this->getTemplateVariable($id, 60);
        $leader['lastName'] = $this->getTemplateVariable($id, 61);
        $leader['title'] = $this->getTemplateVariable($id, 62);
        $leader['subtitle'] = $this->getTemplateVariable($id, 63);
        $leader['description'] = $this->getTemplateVariable($id, 64);

        // contact
        $leader['email'] = $this->getTemplateVariable($id, 66);
        $leader['phone'] = $this->getTemplateVariable($id, 67);

        // image
        $leader['image'] = $this->getTemplateVariable($id, 65);
        if ($leader['image'] != "") $leader['image'] = $uploadsPath . $leader['image'];

        // markets
        $leader['markets'] = explode(',', $this->formatTag($this->getTemplateVariable($id, 59)));

        //optional
        $leader['optionalContent'] = $this->getTemplateVariable($id, 69);

        return $leader;
    }

    public function formatTag($tag) {
        $formatted = str_replace('||', ',', $tag);
        return $formatted;
    }

    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }



}